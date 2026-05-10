"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronLeft, ChevronRight, X } from "lucide-react";
import { photoSrc } from "../data";

export function Gallery({ photos, categories = [] }) {
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
      {filterChips.length > 2 && (
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
                sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
              />
              {(photo.title || photo.subject) && (
                <div className="meta">
                  {photo.title && <strong>{photo.title}</strong>}
                  {photo.subject || photo.place || ""}
                </div>
              )}
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
        <Image
          src={photoSrc(photo)}
          alt={photo.title || photo.subject || "Wildlife photograph"}
          width={photo.width}
          height={photo.height}
          priority
        />
        <div className="lightbox-meta">
          <div>
            {photo.title && <strong>{photo.title}</strong>}
            <span>
              {[photo.subject, photo.place].filter(Boolean).join(" · ") ||
                photo.id}
            </span>
          </div>
          <Link
            href={`/photos/${photo.slug}`}
            className="lightbox-story-link"
            onClick={(e) => e.stopPropagation()}
          >
            Read the story
            <ArrowUpRight size={14} />
          </Link>
          <span>{`${String(index + 1).padStart(2, "0")} / ${String(total).padStart(2, "0")}`}</span>
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
