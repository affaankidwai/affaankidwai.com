"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { photoSrc } from "../data";

export function HeroRotator({ photos }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) return undefined;
    const id = setInterval(() => {
      setActive((current) => (current + 1) % photos.length);
    }, 6500);
    return () => clearInterval(id);
  }, [photos.length]);

  return (
    <div className="hero-stage">
      {photos.map((photo, index) => (
        <div
          key={photo.id}
          className={`hero-slide${index === active ? " is-active" : ""}`}
        >
          <Image
            src={photoSrc(photo)}
            alt=""
            width={photo.width}
            height={photo.height}
            priority={index === 0}
            sizes="100vw"
          />
        </div>
      ))}
    </div>
  );
}
