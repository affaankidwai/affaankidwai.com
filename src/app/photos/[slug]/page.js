import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import {
  formatPhotoDate,
  getPhotoBySlug,
  getPhotoNeighbours,
  photoSrc,
  photos,
} from "../../data";

export function generateStaticParams() {
  return photos.map((photo) => ({ slug: photo.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const photo = getPhotoBySlug(slug);
  if (!photo) return { title: "Frame not found" };
  return {
    title: photo.title || photo.subject || photo.id,
    description:
      photo.fieldNote ||
      [photo.subject, photo.place].filter(Boolean).join(" · ") ||
      undefined,
    openGraph: {
      title: photo.title || photo.subject || photo.id,
      description: photo.fieldNote,
      images: [photoSrc(photo)],
    },
  };
}

export default async function PhotoPage({ params }) {
  const { slug } = await params;
  const photo = getPhotoBySlug(slug);
  if (!photo) notFound();
  const { prev, next } = getPhotoNeighbours(slug);

  const meta = [
    photo.subject && { label: "Species", value: photo.subject },
    photo.place && { label: "Location", value: photo.place },
    photo.date && { label: "Date", value: formatPhotoDate(photo.date) },
  ].filter(Boolean);

  const exif = [
    photo.camera && { label: "Camera", value: photo.camera },
    photo.lens && { label: "Lens", value: photo.lens },
    photo.focal && { label: "Focal length", value: photo.focal },
    [photo.shutter, photo.aperture, photo.iso ? `ISO ${photo.iso}` : null]
      .filter(Boolean).join("  ·  ") && {
        label: "Settings",
        value: [
          photo.shutter,
          photo.aperture,
          photo.iso ? `ISO ${photo.iso}` : null,
        ].filter(Boolean).join("  ·  "),
      },
  ].filter(Boolean);

  return (
    <>
      <SiteHeader />
      <main>
        <article className="photo-page">
          <div className="shell">
            <Link href="/photography" className="back-link">
              <ArrowLeft size={14} />
              All frames
            </Link>
          </div>

          <div className="photo-hero">
            <Image
              src={photoSrc(photo)}
              alt={photo.title || photo.subject || "Wildlife photograph"}
              width={photo.width}
              height={photo.height}
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
            />
          </div>

          <div className="shell photo-body">
            <header className="photo-head">
              <p className="eyebrow">{photo.category || "Wildlife"}</p>
              <h1>{photo.title || `Frame · ${photo.id}`}</h1>
              {meta.length > 0 && (
                <dl className="photo-meta">
                  {meta.map((row) => (
                    <div key={row.label}>
                      <dt>{row.label}</dt>
                      <dd>{row.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
            </header>

            <div className="photo-split">
              <div className="photo-story">
                {photo.fieldNote ? (
                  <p>{photo.fieldNote}</p>
                ) : (
                  <p className="photo-empty">
                    No field note for this frame yet — Affaan&rsquo;s still
                    deciding what to write.
                  </p>
                )}
                {Array.isArray(photo.tags) && photo.tags.length > 0 && (
                  <ul className="photo-tags">
                    {photo.tags.map((tag) => (
                      <li key={tag}>#{tag}</li>
                    ))}
                  </ul>
                )}
              </div>

              {exif.length > 0 && (
                <aside className="photo-exif">
                  <h4>Settings</h4>
                  <dl>
                    {exif.map((row) => (
                      <div key={row.label}>
                        <dt>{row.label}</dt>
                        <dd>{row.value}</dd>
                      </div>
                    ))}
                  </dl>
                </aside>
              )}
            </div>

            <nav className="photo-nav" aria-label="Photo navigation">
              {prev && (
                <Link href={`/photos/${prev.slug}`} className="photo-nav-link prev">
                  <ArrowLeft size={14} />
                  <span>
                    <small>Previous</small>
                    <strong>{prev.title || `Frame · ${prev.id}`}</strong>
                  </span>
                </Link>
              )}
              {next && (
                <Link href={`/photos/${next.slug}`} className="photo-nav-link next">
                  <span>
                    <small>Next</small>
                    <strong>{next.title || `Frame · ${next.id}`}</strong>
                  </span>
                  <ArrowRight size={14} />
                </Link>
              )}
            </nav>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
