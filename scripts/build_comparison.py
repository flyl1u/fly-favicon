#!/usr/bin/env python3
"""Build a portable favicon comparison page using only the Python standard library."""

import argparse
import html
import json
import re
import shutil
import sys
import xml.etree.ElementTree as ET
from pathlib import Path


TEMPLATE_DIR = Path(__file__).resolve().parent.parent / "assets" / "comparison"


def text_field(value, label):
    if not isinstance(value, str) or not value.strip():
        raise ValueError(f"{label} must be a non-empty string")
    return value.strip()


def validate_svg(path, allow_text):
    source = path.read_text(encoding="utf-8-sig")
    root = ET.fromstring(source)
    if root.tag != "{http://www.w3.org/2000/svg}svg":
        raise ValueError(f"{path.name}: expected an SVG root with the SVG namespace")
    box = [float(value) for value in re.split(r"[\s,]+", root.get("viewBox", "").strip()) if value]
    if len(box) != 4 or not (0 < box[2] == box[3] < float("inf")):
        raise ValueError(f"{path.name}: expected a positive, square viewBox")
    for element in root.iter():
        tag = element.tag.rsplit("}", 1)[-1]
        if tag in {"script", "foreignObject", "image", "style"}:
            raise ValueError(f"{path.name}: use self-contained SVG shapes, not {tag}")
        if not allow_text and tag in {"text", "tspan", "textPath"}:
            raise ValueError(f"{path.name}: visible text requires allow_text=true")
        for key, value in element.attrib.items():
            local_key = key.rsplit("}", 1)[-1]
            if local_key.lower().startswith("on"):
                raise ValueError(f"{path.name}: event handlers are not icon artwork")
            if local_key == "href" and not value.startswith("#"):
                raise ValueError(f"{path.name}: external SVG resources are not supported")
            for reference in re.findall(r"url\(\s*['\"]?(.*?)['\"]?\s*\)", value, re.I):
                if not reference.strip(" '\"").startswith("#"):
                    raise ValueError(f"{path.name}: external CSS resources are not supported")
            if "@import" in value.lower() or "font-family" in local_key.lower() or "font-family" in value.lower():
                raise ValueError(f"{path.name}: use font-independent SVG shapes")


def read_manifest(path):
    raw = json.loads(path.read_text(encoding="utf-8-sig"))
    if not isinstance(raw, dict):
        raise ValueError("Manifest must be a JSON object")
    brand = text_field(raw.get("brand"), "brand")
    allow_text = raw.get("allow_text", False)
    if not isinstance(allow_text, bool):
        raise ValueError("allow_text must be a boolean")
    items = raw.get("directions")
    if not isinstance(items, list) or not items:
        raise ValueError("directions must be a non-empty array")
    directions, assets, seen = [], [], set()
    for item in items:
        if not isinstance(item, dict):
            raise ValueError("Each direction must be an object")
        direction = {key: text_field(item.get(key), key) for key in ("id", "title", "category", "description", "icon")}
        icon_id = direction["id"]
        if not re.fullmatch(r"[a-z0-9]+(?:-[a-z0-9]+)*", icon_id) or icon_id in seen:
            raise ValueError(f"Duplicate or invalid direction id: {icon_id}")
        seen.add(icon_id)
        source = (path.parent / direction["icon"]).resolve()
        if not source.is_relative_to(path.parent) or source.suffix.lower() != ".svg" or not source.is_file():
            raise ValueError(f"{icon_id}: icon must be an SVG file inside the manifest directory")
        validate_svg(source, allow_text)
        direction["icon"] = f"icons/{icon_id}.svg"
        directions.append(direction)
        assets.append((source, direction["icon"]))
    recommendations = raw.get("recommendations", [])
    if not isinstance(recommendations, list):
        raise ValueError("recommendations must be an array")
    normalized_recommendations = []
    for recommendation in recommendations:
        if not isinstance(recommendation, dict):
            raise ValueError("Each recommendation must contain id and reason")
        icon_id = text_field(recommendation.get("id"), "recommendation.id")
        reason = text_field(recommendation.get("reason"), "recommendation.reason")
        if icon_id not in seen:
            raise ValueError(f"Recommendation refers to unknown id: {icon_id}")
        normalized_recommendations.append({"id": icon_id, "reason": reason})
    count = len(directions)
    prefix = re.sub(r"[^\w-]+", "-", brand).strip("-_") or "favicon"
    data = {
        "brand": brand,
        "headline": text_field(raw.get("headline", f"给「{brand}」一个标签页符号。"), "headline"),
        "intro": text_field(raw.get("intro", f"{count} 种不同的图形语言，点击即可在当前标签页试用。"), "intro"),
        "tab_title": text_field(raw.get("tab_title", brand), "tab_title"),
        "edition": raw.get("edition", ""),
        "allow_text": allow_text,
        "download_prefix": prefix,
        "recommendations": normalized_recommendations,
        "directions": directions,
    }
    if not isinstance(data["edition"], str):
        raise ValueError("edition must be a string")
    return data, assets


def card(direction, selected):
    escaped = {key: html.escape(value, quote=True) for key, value in direction.items()}
    image = f'./{escaped["icon"]}'
    samples = "".join(
        f'<span class="samples samples--{theme}" aria-hidden="true">'
        + "".join(f'<img src="{image}" width="{size}" height="{size}" alt="">' for size in (16, 24, 32))
        + "</span>" for theme in ("light", "dark")
    )
    return f'''
          <button class="direction" type="button" data-id="{escaped['id']}" aria-pressed="{str(selected).lower()}" aria-label="试用 {escaped['id']} {escaped['title']}：{escaped['category']}">
            <span class="direction-meta"><span class="direction-number">{escaped['id']}</span><span class="direction-state" aria-hidden="true">试用中</span></span>
            <span class="artwork"><img src="{image}" width="80" height="80" alt=""></span>
            <span class="direction-title">{escaped['title']}</span>
            <span class="direction-category">{escaped['category']}</span>
            <span class="direction-description">{escaped['description']}</span>
            {samples}
            <span class="sizes" aria-hidden="true"><span>16</span><span>24</span><span>32</span></span>
          </button>'''


def render(data):
    escape = html.escape
    first = data["directions"][0]
    encoded = json.dumps(data, ensure_ascii=False)
    for char, replacement in (("<", "\\u003c"), (">", "\\u003e"), ("&", "\\u0026"), ("\u2028", "\\u2028"), ("\u2029", "\\u2029")):
        encoded = encoded.replace(char, replacement)
    recommendations = "；".join(
        f'<strong>{escape(item["id"])}</strong>：{escape(item["reason"])}' for item in data["recommendations"]
    ) or "先看实际 16px 的轮廓，再选择适合网站气质的方向。"
    values = {
        "META_DESCRIPTION": escape(f'{data["brand"]} 网页标签页图标交互对比', quote=True),
        "FIRST_ICON": f'./{first["icon"]}',
        "DATA": encoded,
        "FIRST_TITLE": escape(first["title"], quote=True),
        "FIRST_ID": escape(first["id"], quote=True),
        "BRAND": escape(data["brand"]),
        "COUNT": str(len(data["directions"])),
        "EDITION": f'{escape(data["edition"])} <span aria-hidden="true">·</span> ' if data["edition"] else "",
        "HEADLINE": escape(data["headline"]),
        "INTRO": escape(data["intro"]),
        "TAB_TITLE": escape(data["tab_title"]),
        "DOWNLOAD_NAME": escape(f'{data["download_prefix"]}-{first["id"]}.svg', quote=True),
        "CARDS": "".join(card(direction, index == 0) for index, direction in enumerate(data["directions"])),
        "RECOMMENDATIONS": recommendations,
        "ICON_KIND": "图形与文字" if data["allow_text"] else "纯图形",
    }
    template = (TEMPLATE_DIR / "index.html").read_text(encoding="utf-8")
    return re.sub(r"\{\{([A-Z_]+)\}\}", lambda match: values[match.group(1)], template)


def build(manifest, output):
    if output.exists():
        raise ValueError(f"Output already exists; choose a new directory: {output}")
    data, assets = read_manifest(manifest)
    rendered = render(data)
    static_files = {name: (TEMPLATE_DIR / name).read_bytes() for name in ("preview.css", "preview.js")}
    output.mkdir(parents=True, exist_ok=False)
    (output / "icons").mkdir()
    for source, relative in assets:
        shutil.copyfile(source, output / relative)
    for name, content in static_files.items():
        (output / name).write_bytes(content)
    (output / "index.html").write_text(rendered, encoding="utf-8")
    (output / "manifest.json").write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return len(data["directions"])


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--manifest", type=Path, required=True, help="Input JSON; icon paths are relative to it")
    parser.add_argument("--output", type=Path, required=True, help="New output directory; never overwrites")
    args = parser.parse_args()
    try:
        count = build(args.manifest.resolve(), args.output.resolve())
    except (OSError, ValueError, ET.ParseError) as error:
        print(f"Error: {error}", file=sys.stderr)
        return 1
    print(f"Built {count} directions: {args.output.resolve() / 'index.html'}")
    return 0


if __name__ == "__main__":
    sys.exit(main())
