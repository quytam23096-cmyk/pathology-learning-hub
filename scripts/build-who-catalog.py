"""Build the public WHO/IARC classification index used by Atlas GPB.

Only the public classification hierarchy and entity names are collected. The
script deliberately does not copy copyrighted diagnostic descriptions, tables,
or images from WHO Classification of Tumours Online.
"""

from __future__ import annotations

import json
import re
from datetime import datetime, timezone
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import Request, urlopen


BASE_URL = "https://whobluebooks.iarc.fr/structures"
OUTPUT = Path(__file__).resolve().parents[1] / "who-catalog.js"
NON_ENTITY_TITLES = {
    "introduction",
    "overview",
    "general",
    "definition",
    "definitions",
    "references",
}

VOLUMES = [
    ("digestive", "U hệ tiêu hóa", "Digestive System Tumours", "digestive-system-tumours", "GI"),
    ("breast", "U vú", "Breast Tumours", "breast-tumours", "BR"),
    ("thoracic", "U lồng ngực", "Thoracic Tumours", "thoracic-tumours", "THX"),
    ("female-genital", "U sinh dục nữ", "Female Genital Tumours", "female-genital-tumours", "GYN"),
    ("urinary", "U tiết niệu và sinh dục nam", "Urinary and Male Genital Tumours", "urinary-and-male-genital-tumours", "GU"),
    ("head-neck", "U đầu cổ", "Head and Neck Tumours", "head-and-neck-tumours", "HN"),
    ("endocrine", "U nội tiết và thần kinh nội tiết", "Endocrine and Neuroendocrine Tumours", "endocrine-and-neuroendocrine-tumours", "END"),
    ("skin", "U da", "Skin Tumours", "skintumours", "SKIN"),
    ("haematolymphoid", "U huyết học và lympho", "Haematolymphoid Tumours", "haematolymphoid", "HEME"),
    ("cns", "U hệ thần kinh trung ương", "Central Nervous System Tumours", "central-nervous-system-tumours", "CNS"),
    ("soft-tissue-bone", "U mô mềm và xương", "Soft Tissue and Bone Tumours", "soft-tissue-and-bone-tumours", "STB"),
    ("eye", "U mắt và hốc mắt", "Eye and Orbit Tumours", "eyetumours", "EYE"),
    ("paediatric", "U trẻ em", "Paediatric Tumours", "paediatric-tumours", "PED"),
    ("genetic", "Hội chứng u di truyền", "Genetic Tumour Syndromes", "genetic-tumour-syndromes", "GEN"),
]


class StructureParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__(convert_charrefs=True)
        self.in_text = False
        self.div_depth = 0
        self.kind: str | None = None
        self.buffer = ""
        self.rows: list[dict[str, str | int]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        attributes = dict(attrs)
        classes = (attributes.get("class") or "").split()
        if tag == "div" and "text-container" in classes:
            self.in_text = True
            self.div_depth = 1
            return
        if not self.in_text:
            return
        if tag == "div":
            self.div_depth += 1
        if tag in {"h2", "h3", "p"}:
            self._flush()
            self.kind = tag
        elif tag == "br":
            self._flush_line()

    def handle_endtag(self, tag: str) -> None:
        if not self.in_text:
            return
        if tag in {"h2", "h3", "p"}:
            self._flush()
            self.kind = None
        if tag == "div":
            self.div_depth -= 1
            if self.div_depth == 0:
                self.in_text = False

    def handle_data(self, data: str) -> None:
        if self.in_text and self.kind:
            self.buffer += data

    def _flush_line(self) -> None:
        raw = self.buffer.replace("\r", " ").replace("\n", " ")
        text = re.sub(r"\s+", " ", raw).strip()
        if text and self.kind:
            indent = len(raw) - len(raw.lstrip())
            self.rows.append({"kind": self.kind, "indent": indent, "text": text})
        self.buffer = ""

    def _flush(self) -> None:
        self._flush_line()


def fetch_structure(slug: str) -> tuple[str, list[dict[str, str | int]]]:
    url = f"{BASE_URL}/{slug}/"
    request = Request(url, headers={"User-Agent": "AtlasGPB-CatalogBuilder/1.0"})
    with urlopen(request, timeout=45) as response:
        source = response.read().decode("utf-8")
    parser = StructureParser()
    parser.feed(source)
    return url, parser.rows


def entity_rows(rows: list[dict[str, str | int]]) -> list[dict[str, object]]:
    section = ""
    group = ""
    stack: list[dict[str, object]] = []
    entities: list[dict[str, object]] = []

    for index, row in enumerate(rows):
        kind = str(row["kind"])
        text = str(row["text"])
        indent = int(row["indent"])

        if kind == "h2":
            section = text
            group = ""
            stack = []
            continue
        if kind == "h3":
            group = text
            stack = []
            continue
        if kind != "p":
            continue
        if text.casefold() in NON_ENTITY_TITLES:
            continue

        while stack and indent <= int(stack[-1]["indent"]):
            stack.pop()

        next_row = rows[index + 1] if index + 1 < len(rows) else None
        has_child = bool(
            next_row
            and next_row["kind"] == "p"
            and int(next_row["indent"]) > indent
        )

        if has_child:
            stack.append({"indent": indent, "text": text})
            continue

        category = " › ".join(str(item["text"]) for item in stack)
        entities.append(
            {
                "nameEn": text,
                "sectionEn": section,
                "groupEn": group,
                "categoryEn": category,
            }
        )

    unique: list[dict[str, object]] = []
    seen: set[tuple[str, str, str, str]] = set()
    for item in entities:
        key = (
            str(item["nameEn"]),
            str(item["sectionEn"]),
            str(item["groupEn"]),
            str(item["categoryEn"]),
        )
        if key not in seen:
            seen.add(key)
            unique.append(item)
    return unique


def main() -> None:
    volumes: list[dict[str, object]] = []
    entries: list[dict[str, object]] = []

    for volume_id, name_vi, name_en, slug, short in VOLUMES:
        source_url, rows = fetch_structure(slug)
        volume_entries = entity_rows(rows)
        volumes.append(
            {
                "id": volume_id,
                "nameVi": name_vi,
                "nameEn": name_en,
                "short": short,
                "sourceUrl": source_url,
                "entryCount": len(volume_entries),
            }
        )
        for item in volume_entries:
            entries.append({"volumeId": volume_id, **item})

    payload = {
        "generatedAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "source": f"{BASE_URL}/",
        "scope": "Public WHO/IARC classification hierarchy and entity names only",
        "volumes": volumes,
        "entries": entries,
    }
    serialized = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    OUTPUT.write_text(
        "// Generated by scripts/build-who-catalog.py. Do not edit by hand.\n"
        f"window.WHO_ATLAS_CATALOG={serialized};\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(entries)} entries from {len(volumes)} WHO volumes to {OUTPUT.name}")
    for volume in volumes:
        print(f"  {volume['short']:>4}  {volume['entryCount']:>4}  {volume['nameEn']}")


if __name__ == "__main__":
    main()
