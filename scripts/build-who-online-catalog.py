"""Build the WHO Online table-of-contents index used by Atlas GPB.

The script reads the authenticated WHO Classification of Tumours Online table
of contents and stores metadata only: book/article titles, hierarchy, and exact
official URLs. It never stores credentials, access tokens, article text,
tables, or images.

Set WHO_EMAIL and WHO_PASSWORD in the environment before running the script.
"""

from __future__ import annotations

import json
import os
import re
from html import unescape
from datetime import datetime, timezone
from http.cookiejar import CookieJar
from pathlib import Path
from typing import Any
from urllib.request import HTTPCookieProcessor, Request, build_opener


BASE_URL = "https://tumourclassification.iarc.who.int"
OUTPUT = Path(__file__).resolve().parents[1] / "who-catalog.js"
USER_AGENT = "AtlasGPB-WHOOnlineCatalogBuilder/2.0"


BOOK_METADATA: dict[int, dict[str, str]] = {
    48: {"nameVi": "Hệ thống Báo cáo WHO về Tế bào học Phổi", "short": "CLG", "atlasGroup": "thoracic"},
    50: {"nameVi": "Hệ thống Báo cáo WHO về Tế bào học Tụy - Đường mật", "short": "CPB", "atlasGroup": "digestive"},
    49: {"nameVi": "Hệ thống Báo cáo WHO về Tế bào học Hạch, Lách và Tuyến ức", "short": "CLN", "atlasGroup": "haematolymphoid"},
    51: {"nameVi": "Hệ thống Báo cáo WHO về Tế bào học Mô mềm", "short": "CST", "atlasGroup": "soft-tissue-bone"},
    72: {"nameVi": "U hệ tiêu hóa (ấn bản 6)", "short": "GI6", "atlasGroup": "digestive"},
    84: {"nameVi": "U vú (ấn bản 6)", "short": "BR6", "atlasGroup": "breast"},
    67: {"nameVi": "Hội chứng u di truyền", "short": "GEN", "atlasGroup": "genetic"},
    65: {"nameVi": "U mắt và hốc mắt", "short": "EYE", "atlasGroup": "eye"},
    64: {"nameVi": "U da", "short": "SKIN", "atlasGroup": "skin"},
    63: {"nameVi": "U hệ tạo máu và mô lympho", "short": "HEME", "atlasGroup": "haematolymphoid"},
    52: {"nameVi": "U đầu và cổ", "short": "HN", "atlasGroup": "head-neck"},
    53: {"nameVi": "U nội tiết và thần kinh nội tiết", "short": "END", "atlasGroup": "endocrine"},
    36: {"nameVi": "U hệ tiết niệu và sinh dục nam", "short": "GU", "atlasGroup": "urinary"},
    44: {"nameVi": "U trẻ em", "short": "PED", "atlasGroup": "paediatric"},
    45: {"nameVi": "U hệ thần kinh trung ương", "short": "CNS", "atlasGroup": "cns"},
    35: {"nameVi": "U lồng ngực", "short": "THX", "atlasGroup": "thoracic"},
    34: {"nameVi": "U đường sinh dục nữ", "short": "GYN", "atlasGroup": "female-genital"},
    33: {"nameVi": "U mô mềm và xương", "short": "STB", "atlasGroup": "soft-tissue-bone"},
    32: {"nameVi": "U vú (ấn bản 5)", "short": "BR5", "atlasGroup": "breast"},
    31: {"nameVi": "U hệ tiêu hóa (ấn bản 5)", "short": "GI5", "atlasGroup": "digestive"},
}

SERIES_ORDER = {3: 0, 4: 1, 1: 2}
FRONT_MATTER_ROOTS = (
    "foreword",
    "introduction",
    "website beta",
    "contributors",
    "acknowledg",
    "editorial board",
    "subject index",
    "appendix",
    "annex",
)
DIAGNOSTIC_HEADING_TYPES = {
    48: {5},
    50: {5},
    49: {2},
    51: {2},
}


def compact_text(value: object) -> str:
    without_tags = re.sub(r"<[^>]+>", "", str(value or ""))
    return re.sub(r"\s+", " ", unescape(without_tags)).strip()


def open_json(opener: Any, url: str, token: str | None = None) -> Any:
    headers = {"User-Agent": USER_AGENT, "Accept": "application/json"}
    if token:
        headers["Authorization"] = f"Bearer {token}"
    request = Request(url, headers=headers)
    with opener.open(request, timeout=60) as response:
        return json.load(response)


def login(email: str, password: str) -> tuple[Any, str]:
    cookie_jar = CookieJar()
    opener = build_opener(HTTPCookieProcessor(cookie_jar))
    verification_request = Request(
        f"{BASE_URL}/api/Auth/GenerationVerificationToken",
        headers={"User-Agent": USER_AGENT},
    )
    with opener.open(verification_request, timeout=60):
        pass

    xsrf_token = next(
        (cookie.value for cookie in cookie_jar if cookie.name == "XSRF-REQUEST-TOKEN"),
        "",
    )
    if not xsrf_token:
        raise RuntimeError("WHO Online did not return an anti-forgery token")

    payload = json.dumps(
        {"Email": email, "Password": password, "Path": BASE_URL},
        ensure_ascii=False,
    ).encode("utf-8")
    request = Request(
        f"{BASE_URL}/api/auth/login",
        data=payload,
        method="POST",
        headers={
            "User-Agent": USER_AGENT,
            "Content-Type": "application/json",
            "RequestVerificationToken": xsrf_token,
        },
    )
    with opener.open(request, timeout=60) as response:
        login_data = json.load(response)
    token = str(login_data.get("token") or "")
    if not token:
        raise RuntimeError("WHO Online login did not return an access token")
    return opener, token


def is_front_matter(path: list[str], title: str) -> bool:
    root = compact_text(path[0] if path else title).casefold()
    return any(term in root for term in FRONT_MATTER_ROOTS)


def flatten_chapters(
    nodes: list[dict[str, Any]],
    volume_id: str,
    book_id: int,
    ancestors: list[str] | None = None,
) -> list[dict[str, Any]]:
    path = ancestors or []
    entries: list[dict[str, Any]] = []
    for node in sorted(nodes or [], key=lambda item: int(item.get("chapterPosition") or 0)):
        title = compact_text(node.get("chapterTitle"))
        if not title:
            continue
        children = node.get("chapters") or []
        if children:
            entries.extend(flatten_chapters(children, volume_id, book_id, [*path, title]))
            continue

        chapter_id = int(node.get("chapterId") or 0)
        if chapter_id <= 0:
            continue
        section = path[0] if len(path) > 0 else ""
        group = path[1] if len(path) > 1 else ""
        category = " › ".join(path[2:]) if len(path) > 2 else ""
        heading_type = int(node.get("headingType") or 0)
        if is_front_matter(path, title):
            entry_type = "front-matter"
        elif heading_type in DIAGNOSTIC_HEADING_TYPES.get(book_id, {2}):
            entry_type = "diagnosis"
        else:
            entry_type = "supporting"
        entries.append(
            {
                "volumeId": volume_id,
                "bookId": book_id,
                "chapterId": chapter_id,
                "nameEn": title,
                "sectionEn": section,
                "groupEn": group,
                "categoryEn": category,
                "chapterNumber": compact_text(node.get("chapterNumber")),
                "headingType": heading_type,
                "entryType": entry_type,
                "url": f"{BASE_URL}/chaptercontent/{book_id}/{chapter_id}",
            }
        )
    return entries


def main() -> None:
    email = os.environ.get("WHO_EMAIL", "").strip()
    password = os.environ.get("WHO_PASSWORD", "")
    if not email or not password:
        raise SystemExit("Set WHO_EMAIL and WHO_PASSWORD before running this script")

    opener, token = login(email, password)
    books = open_json(opener, f"{BASE_URL}/api/book/GetBooks", token)
    active_books = [
        book
        for book in books
        if bool(book.get("isActive")) and int(book.get("bookid") or 0) in BOOK_METADATA
    ]
    active_books.sort(
        key=lambda book: (
            SERIES_ORDER.get(int(book.get("fkseriesId") or 0), 99),
            int(book.get("sequence") or 0),
        )
    )

    volumes: list[dict[str, Any]] = []
    entries: list[dict[str, Any]] = []
    seen_pages: set[tuple[int, int]] = set()

    for book in active_books:
        book_id = int(book["bookid"])
        volume_id = f"book-{book_id}"
        metadata = BOOK_METADATA[book_id]
        chapters = open_json(opener, f"{BASE_URL}/api/Chapter?bookId={book_id}", token)
        volume_entries = flatten_chapters(chapters, volume_id, book_id)
        unique_entries = []
        for entry in volume_entries:
            page_key = (book_id, int(entry["chapterId"]))
            if page_key in seen_pages:
                continue
            seen_pages.add(page_key)
            unique_entries.append(entry)

        volumes.append(
            {
                "id": volume_id,
                "bookId": book_id,
                "nameVi": metadata["nameVi"],
                "nameEn": compact_text(book.get("bookTitle")),
                "short": metadata["short"],
                "atlasGroup": metadata["atlasGroup"],
                "series": compact_text(book.get("series")),
                "seriesId": int(book.get("fkseriesId") or 0),
                "revision": compact_text(book.get("revision")),
                "sourceUrl": f"{BASE_URL}/chapters/{book_id}",
                "entryCount": len(unique_entries),
            }
        )
        entries.extend(unique_entries)

    payload = {
        "generatedAt": datetime.now(timezone.utc).replace(microsecond=0).isoformat(),
        "source": f"{BASE_URL}/home",
        "scope": "WHO Online table-of-contents metadata and exact official URLs only",
        "volumes": volumes,
        "entries": entries,
    }
    serialized = json.dumps(payload, ensure_ascii=False, separators=(",", ":"))
    OUTPUT.write_text(
        "// Generated by scripts/build-who-online-catalog.py. Do not edit by hand.\n"
        f"window.WHO_ATLAS_CATALOG={serialized};\n",
        encoding="utf-8",
    )
    print(f"Wrote {len(entries)} exact WHO Online links from {len(volumes)} books")
    for volume in volumes:
        print(
            f"  {volume['short']:>5}  {volume['entryCount']:>4}  "
            f"{volume['series']}: {volume['nameEn']}"
        )


if __name__ == "__main__":
    main()
