import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Camera,
  Car,
  Code2,
  Map,
  Music2,
  Spade,
  MapPin,
} from "lucide-react";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import {
  featuredFrame,
  heroPhoto,
  photoSrc,
  profile,
  pursuits,
} from "./data";
import { getAllPosts, formatPostDate } from "../lib/posts";

const pursuitIcons = {
  photography: Camera,
  tech: Code2,
  trips: MapPin,
  cars: Car,
  music: Music2,
  cards: Spade,
};

export default async function Home() {
  const posts = (await getAllPosts()).slice(0, 3);

  return (
    <>
      <SiteHeader />
      <main>
        <section className="hero">
          <div className="hero-stage">
            <Image
              src={photoSrc(heroPhoto)}
              alt=""
              width={heroPhoto.width}
              height={heroPhoto.height}
              priority
              sizes="100vw"
              className="hero-still"
            />
          </div>
          <div className="shell hero-copy">
            <p className="eyebrow">
              <span className="live-dot" aria-hidden="true" />
              Now in Bengaluru
            </p>
            <h1 aria-label="Affaan Kidwai.">
              {"Affaan Kidwai.".split("").map((ch, i) => (
                <span key={i} className="ch" style={{ "--i": i }} aria-hidden="true">
                  {ch === " " ? " " : ch}
                </span>
              ))}
            </h1>
            <p className="lede">
              Associate Application Developer at Oracle Financial Services
              Software. Wildlife photographer in Indian forests. This is where
              I keep the work, the photographs, the trips, and the writing.
            </p>
            <div className="hero-actions">
              <Link className="btn-primary" href="/photography">
                See the photography
                <ArrowRight size={16} />
              </Link>
              <Link className="btn-ghost" href="#about">
                About
              </Link>
            </div>
          </div>
        </section>

        <section id="about" className="about-snippet reveal">
          <div className="shell about-snippet-grid">
            <div>
              <p className="eyebrow">About</p>
              <h2>Two careers, one calendar.</h2>
              <p className="lede">
                I&rsquo;m a back-end engineer at{" "}
                <strong>{profile.company}</strong> in Bengaluru, with a B.Tech
                in Computer Science with AIML from <strong>SRM University</strong>.
                Off the keyboard, I photograph wildlife — most often Bengal
                tigers and the smaller birds you have to wait for.
              </p>
              <p className="lede">
                Originally from Lucknow. The other tabs in my head: cars,
                travel, music, cards.
              </p>
              <Link className="section-link" href="/about" style={{ marginTop: 18 }}>
                Read more
                <ArrowRight size={16} />
              </Link>
            </div>
            <aside className="about-snippet-stats">
              <div className="stat-card">
                <h4>Currently</h4>
                <strong>{profile.role}</strong>
                <span>{profile.company}</span>
              </div>
              <div className="stat-card">
                <h4>Education</h4>
                <strong>B.Tech, CS with AIML</strong>
                <span>SRM University · 2020 – 2024</span>
              </div>
              <div className="stat-card stat-card-tags">
                <h4>Skills</h4>
                <ul>
                  {profile.topSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="featured-frame reveal">
          <div className="shell featured-frame-grid">
            <Link
              href={`/photos/${featuredFrame.slug}`}
              className="featured-frame-image"
              aria-label={featuredFrame.title}
            >
              <Image
                src={photoSrc(featuredFrame)}
                alt={featuredFrame.title || ""}
                width={featuredFrame.width}
                height={featuredFrame.height}
                sizes="(max-width: 1000px) 100vw, 60vw"
              />
            </Link>
            <div className="featured-frame-copy">
              <p className="eyebrow">Featured frame</p>
              <h2>{featuredFrame.title || "Untitled"}</h2>
              <ul className="featured-frame-meta">
                {featuredFrame.subject && <li><span>Species</span>{featuredFrame.subject}</li>}
                {featuredFrame.place && <li><span>Location</span>{featuredFrame.place}</li>}
                {featuredFrame.shutter && featuredFrame.aperture && (
                  <li>
                    <span>Settings</span>
                    {featuredFrame.shutter} · {featuredFrame.aperture} · ISO {featuredFrame.iso}
                  </li>
                )}
              </ul>
              {featuredFrame.fieldNote && (
                <p className="featured-frame-note">{featuredFrame.fieldNote}</p>
              )}
              <Link className="section-link" href={`/photos/${featuredFrame.slug}`} style={{ marginTop: 18 }}>
                View frame
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </section>

        <section className="section reveal" id="worlds">
          <div className="shell">
            <div className="section-head">
              <div>
                <p className="eyebrow">Worlds</p>
                <h2>Six things I&rsquo;m into.</h2>
              </div>
              <p className="lede">
                Photography is the only one with a real page right now. The
                rest will come over time.
              </p>
            </div>
            <div className="pursuits-grid">
              {pursuits.map((pursuit) => {
                const Icon = pursuitIcons[pursuit.slug];
                const isLive = pursuit.status === "live";
                const TileTag = isLive ? Link : "div";
                const tagProps = isLive ? { href: pursuit.href } : {};
                return (
                  <TileTag
                    key={pursuit.slug}
                    className={`pursuit-tile ${isLive ? "is-live" : "is-soon"}`}
                    {...tagProps}
                  >
                    {isLive && pursuit.cover && (
                      <Image
                        className="pursuit-cover"
                        src={pursuit.cover}
                        alt=""
                        width={1600}
                        height={1066}
                        sizes="(max-width: 1000px) 100vw, 50vw"
                      />
                    )}
                    <div className="pursuit-body">
                      <div className="pursuit-top">
                        <span className="pursuit-icon">
                          {Icon && <Icon size={16} strokeWidth={1.6} />}
                        </span>
                        <span className="pursuit-status">
                          {isLive ? pursuit.detail : "Soon"}
                        </span>
                      </div>
                      <p className="pursuit-eyebrow">{pursuit.eyebrow}</p>
                      <h3>{pursuit.title}</h3>
                      <p className="pursuit-desc">{pursuit.description}</p>
                      {isLive ? (
                        <span className="pursuit-cta">
                          Enter <ArrowRight size={14} />
                        </span>
                      ) : (
                        <span className="pursuit-cta pursuit-cta-soon">
                          Drafting
                        </span>
                      )}
                    </div>
                  </TileTag>
                );
              })}
            </div>
          </div>
        </section>

        {posts.length > 0 && (
          <section className="section section-tight reveal">
            <div className="shell">
              <div className="section-head">
                <div>
                  <p className="eyebrow">Journal</p>
                  <h2>From the journal.</h2>
                </div>
                <p className="lede">
                  Notes from forests, lake edges, the road, and the long
                  waits behind a photograph.
                </p>
              </div>
              <div className="posts-grid">
                {posts.map((post) => (
                  <Link key={post.slug} className="post-card" href={`/journal/${post.slug}`}>
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
              <Link className="section-link" href="/journal" style={{ marginTop: 28 }}>
                All entries
                <ArrowRight size={16} />
              </Link>
            </div>
          </section>
        )}

        <section className="contact-band reveal">
          <div className="shell-narrow">
            <p className="eyebrow">Contact</p>
            <h2>Say hi.</h2>
            <p className="lede">
              For prints, projects, or just a conversation — drop a line.
            </p>
            <div className="contact-actions">
              <a className="btn-primary" href={`mailto:${profile.email}`}>
                {profile.email}
              </a>
              <a className="btn-ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
