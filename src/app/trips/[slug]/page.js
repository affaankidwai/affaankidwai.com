import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import {
  formatTripDate,
  getAllTripSlugs,
  getTrip,
} from "../../../lib/trips";
import { getAllPostSlugs, getPost, formatPostDate } from "../../../lib/posts";
import { getPhotoBySlug, photoSrc } from "../../data";

export async function generateStaticParams() {
  const slugs = await getAllTripSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const trip = await getTrip(slug);
  if (!trip) return { title: "Trip not found" };
  return {
    title: trip.title,
    description: trip.summary,
    openGraph: {
      title: trip.title,
      description: trip.summary,
      images: trip.cover ? [trip.cover] : [],
    },
  };
}

export default async function TripPage({ params }) {
  const { slug } = await params;
  const trip = await getTrip(slug);
  if (!trip) notFound();

  // Resolve linked photos by slug.
  const photoSlugs = Array.isArray(trip.photos) ? trip.photos : [];
  const linkedPhotos = photoSlugs
    .map((s) => getPhotoBySlug(s))
    .filter(Boolean);

  // Resolve linked journal posts by slug.
  const postSlugs = Array.isArray(trip.posts) ? trip.posts : [];
  const allPostSlugs = await getAllPostSlugs();
  const linkedPosts = (
    await Promise.all(
      postSlugs
        .filter((s) => allPostSlugs.includes(s))
        .map(async (s) => await getPost(s)),
    )
  ).filter(Boolean);

  return (
    <>
      <SiteHeader />
      <main>
        <article className="trip-page">
          <div className="shell">
            <Link href="/trips" className="back-link">
              <ArrowLeft size={14} />
              All trips
            </Link>
          </div>

          <header className="trip-hero shell">
            <p className="eyebrow">Trip</p>
            <h1>{trip.title}</h1>
            <div className="trip-hero-meta">
              {trip.date && <span>{formatTripDate(trip.date)}</span>}
              {trip.location && (
                <>
                  <span className="dot">·</span>
                  <span>{trip.location}</span>
                </>
              )}
              {trip.duration && (
                <>
                  <span className="dot">·</span>
                  <span>{trip.duration}</span>
                </>
              )}
            </div>
            {trip.summary && <p className="trip-summary">{trip.summary}</p>}
          </header>

          {trip.cover && (
            <div className="trip-cover">
              <Image
                src={trip.cover}
                alt=""
                width={2400}
                height={1350}
                priority
                sizes="(max-width: 1280px) 100vw, 1280px"
              />
            </div>
          )}

          <div className="shell">
            <div className="post-prose">{trip.content}</div>
          </div>

          {linkedPhotos.length > 0 && (
            <section className="trip-photos">
              <div className="shell">
                <div className="trip-section-head">
                  <p className="eyebrow">Frames from this trip</p>
                  <h2>{linkedPhotos.length} {linkedPhotos.length === 1 ? "photograph" : "photographs"}</h2>
                </div>
                <div className="trip-photos-grid">
                  {linkedPhotos.map((photo) => (
                    <Link
                      key={photo.id}
                      href={`/photos/${photo.slug}`}
                      className="trip-photo"
                    >
                      <Image
                        src={photoSrc(photo)}
                        alt={photo.title || photo.subject || ""}
                        width={photo.width}
                        height={photo.height}
                        sizes="(max-width: 700px) 100vw, 50vw"
                      />
                      <div className="trip-photo-meta">
                        <strong>{photo.title || `Frame · ${photo.id}`}</strong>
                        <span>
                          {[photo.subject, photo.shutter, photo.aperture]
                            .filter(Boolean)
                            .join("  ·  ")}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}

          {linkedPosts.length > 0 && (
            <section className="trip-posts">
              <div className="shell">
                <div className="trip-section-head">
                  <p className="eyebrow">Related writing</p>
                  <h2>From the journal, around this trip.</h2>
                </div>
                <div className="trip-posts-grid">
                  {linkedPosts.map((post) => (
                    <Link key={post.slug} href={`/journal/${post.slug}`} className="trip-post-card">
                      <div className="post-meta">
                        <span>{formatPostDate(post.date)}</span>
                        {post.location && (
                          <>
                            <span className="dot">·</span>
                            <span>{post.location}</span>
                          </>
                        )}
                      </div>
                      <h3>{post.title}</h3>
                      {post.summary && <p>{post.summary}</p>}
                      <span className="trip-card-cta">
                        Read note
                        <ArrowRight size={14} />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
          )}
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
