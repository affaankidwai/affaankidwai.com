"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { photoSrc } from "../data";

export function Gallery({ photos, categories = [], showFilter = true }) {
  const [filter, setFilter] = useState("All");
  const [openIndex, setOpenIndex] = useState(null);

  const filtered = useMemo(() => {
    if (filter === "All") return photos;
    if (filter === "Favorites") return photos.filter((p) => p.favorite);
    return photos.filter((p) => p.category === filter);
  }, [photos, filter]);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % filtered.length));
  }, [filtered.length]);
  const prev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + filtered.length) % filtered.length,
    );
  }, [filtered.length]);

  useEffect(() => {
    if (openIndex === null) return undefined;
    const onKey = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowRight") next();
      if (event.key === "ArrowLeft") prev();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [openIndex, close, next, prev]);

  const filterChips = ["All", ...categories, "Favorites"];

  return (
    <>
      {showFilter && filterChips.length > 2 && (
        <div className="gallery-filter" role="tablist" aria-label="Filter frames">
          {filterChips.map((chip) => (
            <button
              key={chip}
              type="button"
              role="tab"
              aria-selected={filter === chip}
              className={`gallery-filter-chip${filter === chip ? " is-active" : ""}`}
              onClick={() => {
                setFilter(chip);
                setOpenIndex(null);
              }}
            >
              {chip}
              <span className="gallery-filter-count">
                {chip === "All"
                  ? photos.length
                  : chip === "Favorites"
                    ? photos.filter((p) => p.favorite).length
                    : photos.filter((p) => p.category === chip).length}
              </span>
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="gallery-empty">No frames in this set yet.</p>
      ) : (
        <div className="gallery">
          {filtered.map((photo, index) => (
            <button
              key={photo.id}
              className="gallery-item"
              type="button"
              onClick={() => setOpenIndex(index)}
              aria-label={`Open ${photo.title || photo.id}`}
              style={{ aspectRatio: `${photo.width} / ${photo.height}` }}
            >
              <Image
                src={photoSrc(photo)}
                alt={photo.title || photo.subject || "Wildlife photograph"}
                width={photo.width}
                height={photo.height}
                sizes="(max-width: 700px) 100vw, 50vw"
              />
              <div className="gallery-meta" aria-hidden="true">
                {(photo.subject || photo.category) && (
                  <span className="gallery-meta-eyebrow">
                    {[photo.subject, photo.place].filter(Boolean).join(" · ") ||
                      photo.category}
                  </span>
                )}
                {(photo.title || photo.id) && (
                  <strong className="gallery-meta-title">
                    {photo.title || photo.id}
                  </strong>
                )}
                {(photo.camera || photo.lens || photo.focal) && (
                  <span className="gallery-meta-gear">
                    {[photo.camera, [photo.lens, photo.focal].filter(Boolean).join(" · ")]
                      .filter(Boolean)
                      .join(" · ")}
                  </span>
                )}
                {(photo.shutter || photo.aperture || photo.iso) && (
                  <span className="gallery-meta-settings">
                    {[
                      photo.shutter,
                      photo.aperture,
                      photo.iso ? `ISO ${photo.iso}` : null,
                    ]
                      .filter(Boolean)
                      .join("  ·  ")}
                  </span>
                )}
              </div>
            </button>
          ))}
        </div>
      )}

      {openIndex !== null && filtered[openIndex] && (
        <LightboxStage
          photo={filtered[openIndex]}
          index={openIndex}
          total={filtered.length}
          onClose={close}
          onNext={next}
          onPrev={prev}
        />
      )}
    </>
  );
}

function LightboxStage({ photo, index, total, onClose, onNext, onPrev }) {
  const settings = [
    photo.shutter,
    photo.aperture,
    photo.iso ? `ISO ${photo.iso}` : null,
  ]
    .filter(Boolean)
    .join("  ·  ");

  return (
    <div
      className="lightbox"
      role="dialog"
      aria-modal="true"
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="lightbox-stage">
        <div className="lightbox-image">
          <Image
            src={photoSrc(photo)}
            alt={photo.title || photo.subject || "Wildlife photograph"}
            width={photo.width}
            height={photo.height}
            priority
            sizes="80vw"
          />
        </div>
        <div className="lightbox-caption">
          <div className="lightbox-caption-text">
            {photo.title && <strong>{photo.title}</strong>}
            <span>
              {[photo.subject, photo.place].filter(Boolean).join(" · ") ||
                photo.id}
              {settings ? `  ·  ${settings}` : ""}
            </span>
          </div>
          <div className="lightbox-caption-actions">
            <span className="lightbox-counter">{`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}</span>
            <Link href={`/photos/${photo.slug}`} className="lightbox-readmore">
              Read more
              <ArrowUpRight size={14} />
            </Link>
          </div>
        </div>
      </div>
      <button
        type="button"
        className="lightbox-close"
        onClick={onClose}
        aria-label="Close"
      >
        <X size={20} />
      </button>
      {total > 1 && (
        <>
          <button
            type="button"
            className="lightbox-prev"
            onClick={onPrev}
            aria-label="Previous"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            type="button"
            className="lightbox-next"
            onClick={onNext}
            aria-label="Next"
          >
            <ChevronRight size={20} />
          </button>
        </>
      )}
    </div>
  );
}
