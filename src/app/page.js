import Link from "next/link";
import Image from "next/image";
import { ArrowRight, ArrowDown } from "lucide-react";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { HeroRotator } from "./components/HeroRotator";
import {
  featuredPhotos,
  heroRotation,
  photoSrc,
  profile,
} from "./data";
import { getAllPosts, formatPostDate } from "../lib/posts";

const layoutClasses = [
  "is-large",
  "is-tall",
  "is-wide",
  "is-medium",
  "is-short",
  "is-short",
];

const subjects = [
  "Bengal Tiger",
  "White-throated Kingfisher",
  "Paradise Flycatcher",
  "Pond Heron",
  "Ruddy Shelduck",
  "Stone-curlew",
  "Song Thrush",
  "Bluethroat",
];

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 3);
  const featured = featuredPhotos.slice(0, 6);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <HeroRotator photos={heroRotation} />
          <div className="shell hero-copy">
            <p className="eyebrow">Wildlife photography · India</p>
            <h1>
              Frames from forests
              <br />
              <span className="accent">that don&rsquo;t hurry.</span>
            </h1>
            <p className="lede">
              I&rsquo;m Affaan — a developer with a field notebook. This is where
              I keep the photographs and the long, slow stories that come with
              waiting in a hide before sunrise.
            </p>
            <div className="hero-actions">
              <Link className="btn-primary" href="/photography">
                See the gallery
                <ArrowRight size={16} />
              </Link>
              <Link className="btn-ghost" href="/blog">
                Read the field notes
              </Link>
            </div>
          </div>
          <div className="hero-meta">
            <span>India · 2024–25</span>
            <span>{`${featuredPhotos.length} featured · ${heroRotation.length} on rotation`}</span>
          </div>
          <span className="hero-scroll-cue">
            Scroll
            <ArrowDown size={12} />
          </span>
        </section>

        <section className="subjects-band" aria-label="Subjects in the archive">
          <div className="subjects-track">
            {[...subjects, ...subjects].map((subject, index) => (
              <span
                key={`${subject}-${index}`}
                className={index % 2 === 0 ? "" : "muted"}
              >
                {subject}
              </span>
            ))}
          </div>
        </section>

        <section className="section reveal">
          <div className="shell">
            <div className="section-head">
              <div>
                <p className="eyebrow">Selected work</p>
                <h2>
                  A small set of frames I keep <span className="accent">coming back to.</span>
                </h2>
              </div>
              <p className="lede">
                These are the photographs that taught me something — about
                patience, about light, about how the smallest creature in the
                frame can still hold the whole forest still.
              </p>
            </div>
            <div className="featured-grid">
              {featured.map((photo, index) => (
                <Link
                  key={photo.id}
                  href="/photography"
                  className={`featured-card ${layoutClasses[index] ?? "is-medium"}`}
                  aria-label={photo.title || photo.id}
                >
                  <Image
                    src={photoSrc(photo)}
                    alt={photo.title || photo.subject || "Wildlife photograph"}
                    width={photo.width}
                    height={photo.height}
                    sizes="(max-width: 1000px) 100vw, 50vw"
                  />
                  {(photo.title || photo.subject) && (
                    <div className="meta">
                      {photo.title && <strong>{photo.title}</strong>}
                      <span>{photo.subject || photo.place}</span>
                    </div>
                  )}
                </Link>
              ))}
            </div>
            <Link className="section-link" href="/photography" style={{ marginTop: 36 }}>
              Enter the full archive
              <ArrowRight size={16} />
            </Link>
          </div>
        </section>

        <section className="pull-quote reveal">
          <div className="shell">
            <blockquote>
              The best wildlife photographs come from showing up earlier than
              you&rsquo;d like, and waiting longer than feels reasonable.
            </blockquote>
            <cite>Field notes · 2024</cite>
          </div>
        </section>

        {posts.length > 0 && (
          <section className="section section-tight reveal">
            <div className="shell">
              <div className="section-head">
                <div>
                  <p className="eyebrow">From the journal</p>
                  <h2>
                    Field notes & <span className="accent">trip writing.</span>
                  </h2>
                </div>
                <p className="lede">
                  Slow blog entries about what waiting in a hide teaches you, the
                  weather of a forest, gear that should disappear, and the small
                  decisions behind a photograph.
                </p>
              </div>
              <div className="posts-grid">
                {posts.map((post) => (
                  <Link key={post.slug} className="post-card" href={`/blog/${post.slug}`}>
                    {post.cover && (
                      <div className="post-cover">
                        <Image
                          src={post.cover}
                          alt=""
                          width={900}
                          height={600}
                          sizes="(max-width: 1000px) 100vw, 33vw"
                        />
                      </div>
                    )}
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
                  </Link>
                ))}
              </div>
              <Link className="section-link" href="/blog" style={{ marginTop: 36 }}>
                All field notes
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )}

        <section className="about-band reveal">
          <div className="shell about-band-grid">
            <div className="about-portrait">
              <Image
                src={photoSrc(featured[0])}
                alt="Affaan Kidwai's photography"
                width={featured[0].width}
                height={featured[0].height}
                sizes="(max-width: 1000px) 100vw, 50vw"
              />
            </div>
            <div>
              <p className="eyebrow">About</p>
              <h2>
                A developer with a <span className="accent">field notebook.</span>
              </h2>
              <p className="lede">
                {profile.role}. Computer Science with AIML from SRM University.
                The day job is back-end systems, databases, and cloud. The
                other half of life is forests, dawn light, and the slow work of
                being somewhere quietly enough to be invited in.
              </p>
              <p className="lede">Based in {profile.base}.</p>
              <Link className="section-link" href="/about" style={{ marginTop: 28 }}>
                Read more about me
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
