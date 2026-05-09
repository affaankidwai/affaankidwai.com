"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { photoSrc } from "../data";

export function Gallery({ photos }) {
  const [openIndex, setOpenIndex] = useState(null);

  const close = useCallback(() => setOpenIndex(null), []);
  const next = useCallback(() => {
    setOpenIndex((i) => (i === null ? null : (i + 1) % photos.length));
  }, [photos.length]);
  const prev = useCallback(() => {
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + photos.length) % photos.length,
    );
  }, [photos.length]);

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

  return (
    <>
      <div className="gallery">
        {photos.map((photo, index) => (
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
      {openIndex !== null && (
        <LightboxStage
          photo={photos[openIndex]}
          index={openIndex}
          total={photos.length}
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
