#!/usr/bin/env python3
"""Read EXIF from /public/photos originals and emit a `photos = [...]` block
that can be pasted into src/app/data.js. Curated metadata (titles, field
notes, favorite flags) lives in CURATED below — edit there.

Usage:
    python3 scripts/sync-photos.py > /tmp/photos_block.js

Requires Pillow:
    pip install Pillow
"""
from PIL import Image, ExifTags
import os
import glob

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PHOTOS_DIR = os.path.join(ROOT, "public", "photos")
GALLERY_DIR = os.path.join(ROOT, "public", "gallery")

# Edit this dictionary to give photos titles, field notes, favorite flags.
# Keys are filenames without extension. Anything not listed here gets
# default values (empty title, "Wildlife" category).
CURATED = {
    "IMG_0757": {
        "slug": "on-the-trail",
        "title": "On the trail",
        "subject": "Bengal Tiger",
        "category": "Tigers",
        "place": "Central India",
        "favorite": True,
        "featured": True,
        "fieldNote": "A long, quiet morning. We waited at a bend in the road as the alarm calls thinned out. Then he just appeared — walking the same line he'd walked the day before, his pace not changing for us. The frame is from his second step into open light.",
        "tags": ["tiger", "forest", "patrol", "morning"],
    },
    "IMG_8409": {
        "slug": "eyes-of-the-dry-forest",
        "title": "Eyes of the dry forest",
        "subject": "Bengal Tiger",
        "category": "Tigers",
        "place": "Central India",
        "favorite": True,
        "featured": True,
        "fieldNote": "A late-afternoon sighting — we were almost out of light. The tiger turned briefly to look at us and held the gaze for maybe two seconds. The forest was completely silent. ISO climbed but the moment was worth it.",
        "tags": ["tiger", "portrait", "forest"],
    },
    # ...full list lives in src/app/data.js once generated.
}


def fmt_shutter(v):
    if v is None: return None
    try:
        f = float(v)
        if f >= 1: return f"{f:.0f}s"
        return f"1/{int(round(1/f))}s"
    except Exception: return str(v)


def fmt_aperture(v):
    if v is None: return None
    try: return f"f/{float(v):.1f}".replace(".0", "")
    except Exception: return str(v)


def fmt_focal(v):
    if v is None: return None
    try: return f"{int(round(float(v)))}mm"
    except Exception: return str(v)


def model_name(make, model):
    if not model: return None
    m = str(model).strip()
    if m.startswith(str(make).strip()):
        m = m[len(str(make).strip()):].strip()
    if "R6m2" in m: return "Canon EOS R6 Mark II"
    return f"Canon {m}".replace("Canon Canon", "Canon").strip()


def main():
    items = []
    for fname in sorted(os.listdir(GALLERY_DIR)):
        if not fname.lower().endswith(".jpg"): continue
        if fname.startswith("."): continue
        base = fname[:-4]
        gallery_path = os.path.join(GALLERY_DIR, fname)
        try:
            img = Image.open(gallery_path)
            width, height = img.size
        except Exception:
            continue

        exif_data = {}
        for ext in ("jpg", "JPG", "jpeg", "JPEG"):
            sp = os.path.join(PHOTOS_DIR, f"{base}.{ext}")
            if os.path.exists(sp):
                try:
                    src = Image.open(sp)
                    exif = src.getexif()
                    ifd = exif.get_ifd(ExifTags.IFD.Exif)
                    base_t = {ExifTags.TAGS.get(k, k): v for k, v in exif.items()}
                    ext_t = {ExifTags.TAGS.get(k, k): v for k, v in ifd.items()}
                    exif_data = {
                        "camera": model_name(base_t.get("Make"), base_t.get("Model")),
                        "lens": ext_t.get("LensModel"),
                        "focal": fmt_focal(ext_t.get("FocalLength")),
                        "shutter": fmt_shutter(ext_t.get("ExposureTime")),
                        "aperture": fmt_aperture(ext_t.get("FNumber")),
                        "iso": ext_t.get("ISOSpeedRatings") or ext_t.get("PhotographicSensitivity"),
                        "date": str(ext_t.get("DateTimeOriginal") or "")[:10].replace(":", "-"),
                    }
                    exif_data = {k: v for k, v in exif_data.items() if v not in (None, "")}
                except Exception:
                    pass
                break

        cur = CURATED.get(base, {})
        item = {
            "id": base,
            "slug": cur.get("slug", base.lower().replace("_", "-")),
            "title": cur.get("title", ""),
            "subject": cur.get("subject", ""),
            "category": cur.get("category", "Wildlife"),
            "place": cur.get("place", ""),
            "width": width,
            "height": height,
            **exif_data,
        }
        if cur.get("featured"): item["featured"] = True
        if cur.get("favorite"): item["favorite"] = True
        if cur.get("fieldNote"): item["fieldNote"] = cur["fieldNote"]
        if cur.get("tags"): item["tags"] = cur["tags"]
        items.append(item)

    print("export const photos = [")
    for it in items:
        print("  {")
        for k, v in it.items():
            if isinstance(v, str):
                esc = v.replace("\\", "\\\\").replace('"', '\\"')
                print(f'    {k}: "{esc}",')
            elif isinstance(v, bool):
                print(f'    {k}: {"true" if v else "false"},')
            elif isinstance(v, list):
                inner = ", ".join('"' + str(x).replace('"', '\\"') + '"' for x in v)
                print(f'    {k}: [{inner}],')
            else:
                print(f'    {k}: {v},')
        print("  },")
    print("];")


if __name__ == "__main__":
    main()
