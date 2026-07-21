"""Build a link-only WebPathology catalog from its public sitemap.

The generated file stores public, full-page gallery/category URLs only. It does
not download, copy, proxy, frame, or republish WebPathology images.
"""

from __future__ import annotations

import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse


SITEMAP_URL = "https://www.webpathology.com/sitemap.xml"
TERMS_URL = "https://www.webpathology.com/terms-of-use"
OUTPUT = Path(__file__).resolve().parents[1] / "webpathology-catalog.js"

ORGAN_LABELS = {
    "breast": ("Vú", ["vu", "tuyen vu", "breast"]),
    "cancer-genomics": ("Di truyền học ung thư", ["di truyen ung thu", "genomics"]),
    "cardiovascular": ("Tim mạch", ["tim mach", "cardiovascular"]),
    "cytopathology": ("Tế bào học", ["te bao hoc", "cytology", "cytopathology"]),
    "dermpath": ("Bệnh học da", ["da", "benh hoc da", "dermatopathology"]),
    "endocrine": ("Nội tiết", ["noi tiet", "tuyen giap", "thyroid", "endocrine"]),
    "gastrointestinal": ("Tiêu hóa", ["tieu hoa", "da day", "dai truc trang", "gastrointestinal"]),
    "genitourinary": ("Tiết niệu - sinh dục nam", ["tiet nieu", "than", "tuyen tien liet", "genitourinary"]),
    "gynecologic": ("Phụ khoa", ["phu khoa", "co tu cung", "noi mac tu cung", "buong trung", "gynecologic"]),
    "head-and-neck": ("Đầu cổ", ["dau co", "tuyen nuoc bot", "head and neck"]),
    "hematopathology": ("Huyết học - lympho", ["huyet hoc", "hach", "lymphoma", "hematopathology"]),
    "infectious-disease": ("Bệnh nhiễm trùng", ["nhiem trung", "viem", "infectious disease"]),
    "mediastinum": ("Trung thất", ["trung that", "mediastinum"]),
    "neuropath": ("Thần kinh", ["than kinh", "nao", "neuropathology"]),
    "orthopedic": ("Xương - khớp", ["xuong", "khop", "orthopedic"]),
    "peritoneum": ("Phúc mạc", ["phuc mac", "peritoneum"]),
    "pulmonary": ("Phổi", ["phoi", "lung", "pulmonary"]),
    "soft-tissue": ("Mô mềm", ["mo mem", "soft tissue", "sarcoma"]),
}

ACRONYMS = {
    "afp", "aids", "all", "aml", "bcc", "bcl2", "bcl6", "cd", "cd10",
    "cd20", "cd30", "cd34", "cd56", "cd117", "cll", "cns", "dcis",
    "dlbcl", "ebv", "er", "fna", "gist", "gms", "her2", "hiv", "hpv",
    "idh", "ihc", "lcis", "malt", "mds", "pas", "pnet", "pr", "ptc",
    "rcc", "scc", "sll", "tcc", "who",
}


def titleize_slug(slug: str) -> str:
    words = [word for word in re.split(r"[-_]+", slug) if word]
    rendered = []
    for word in words:
        lower = word.lower()
        if lower in ACRONYMS:
            rendered.append(lower.upper())
        elif re.fullmatch(r"\d+", word):
            rendered.append(word)
        else:
            rendered.append(lower.capitalize())
    return " ".join(rendered)


def fetch_sitemap() -> bytes:
    request = urllib.request.Request(
        SITEMAP_URL,
        headers={
            "User-Agent": (
                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) "
                "AppleWebKit/537.36 (KHTML, like Gecko) "
                "Chrome/138.0.0.0 Safari/537.36"
            ),
            "Accept": "application/xml,text/xml;q=0.9,*/*;q=0.8",
        },
    )
    with urllib.request.urlopen(request, timeout=45) as response:
        return response.read()


def build_catalog(xml_bytes: bytes) -> dict:
    root = ET.fromstring(xml_bytes)
    namespace = {"s": "http://www.sitemaps.org/schemas/sitemap/0.9"}
    entries = []
    organ_roots = {}
    seen_urls = set()

    for node in root.findall("s:url", namespace):
        location = (node.findtext("s:loc", default="", namespaces=namespace) or "").strip()
        last_modified = (node.findtext("s:lastmod", default="", namespaces=namespace) or "").strip()
        parsed = urlparse(location)
        segments = [segment for segment in parsed.path.split("/") if segment]
        if len(segments) < 2 or segments[0] != "images":
            continue

        organ = segments[1]
        canonical_url = f"https://www.webpathology.com/{'/'.join(segments)}"
        if len(segments) == 2:
            organ_roots[organ] = canonical_url
            continue

        if canonical_url in seen_urls:
            continue
        seen_urls.add(canonical_url)

        trail = [titleize_slug(segment) for segment in segments[2:]]
        entries.append(
            {
                "organ": organ,
                "titleEn": trail[-1],
                "trailEn": trail,
                "url": canonical_url,
                "lastModified": last_modified,
            }
        )

    entries.sort(key=lambda item: (item["organ"], item["trailEn"], item["url"]))
    counts = Counter(entry["organ"] for entry in entries)
    organ_ids = sorted(set(organ_roots) | set(counts))
    organs = []
    for organ in organ_ids:
        label_vi, aliases = ORGAN_LABELS.get(organ, (titleize_slug(organ), [organ]))
        organs.append(
            {
                "id": organ,
                "nameEn": titleize_slug(organ),
                "nameVi": label_vi,
                "aliases": aliases,
                "url": organ_roots.get(organ, f"https://www.webpathology.com/images/{organ}"),
                "entryCount": counts[organ],
            }
        )

    return {
        "generatedAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "source": SITEMAP_URL,
        "terms": TERMS_URL,
        "scope": "Public full-page gallery and category links only; no image files are copied or embedded",
        "organs": organs,
        "entries": entries,
    }


def main() -> None:
    catalog = build_catalog(fetch_sitemap())
    serialized = json.dumps(catalog, ensure_ascii=False, separators=(",", ":"))
    OUTPUT.write_text(
        "// Generated by scripts/build-webpathology-catalog.py. Do not edit by hand.\n"
        f"window.WEBPATHOLOGY_CATALOG={serialized};\n",
        encoding="utf-8",
    )
    print(
        f"Wrote {len(catalog['entries'])} WebPathology links "
        f"across {len(catalog['organs'])} organ groups to {OUTPUT.name}"
    )


if __name__ == "__main__":
    main()
