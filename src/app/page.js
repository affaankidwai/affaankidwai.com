import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ArrowDown,
  Camera,
  Car,
  Code2,
  Map,
  Music2,
  Spade,
} from "lucide-react";
import { SiteHeader } from "./components/SiteHeader";
import { SiteFooter } from "./components/SiteFooter";
import { HeroRotator } from "./components/HeroRotator";
import {
  heroRotation,
  photoSrc,
  profile,
  pursuits,
} from "./data";
import { getAllPosts, formatPostDate } from "../lib/posts";

const pursuitIcons = {
  photography: Camera,
  tech: Code2,
  travel: Map,
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
          <HeroRotator photos={heroRotation} />
          <div className="shell hero-copy">
            <p className="eyebrow">Lucknow · Bengaluru · India</p>
            <h1>
              Hi, I&rsquo;m
              <br />
              <span className="accent">Affaan Kidwai.</span>
            </h1>
            <p className="lede">
              I build back-end systems at Oracle by day, photograph wildlife
              in Indian forests by weekend, and spend the rest of my time on
              cars, cards, music, and the road. This site is where I keep
              all of it.
            </p>
            <div className="hero-actions">
              <Link className="btn-primary" href="/photography">
                See the photography
                <ArrowRight size={16} />
              </Link>
              <Link className="btn-ghost" href="#about">
                About me
              </Link>
            </div>
          </div>
          <div className="hero-meta">
            <span>Developer · Photographer</span>
            <span>{`Oracle · since ${profile.roleSince.split(" ")[1]}`}</span>
          </div>
          <span className="hero-scroll-cue">
            Scroll
            <ArrowDown size={12} />
          </span>
        </section>

        <section id="about" className="about-snippet reveal">
          <div className="shell about-snippet-grid">
            <div>
              <p className="eyebrow">About</p>
              <h2>
                Code by day,
                <br />
                <span className="accent">forests by weekend.</span>
              </h2>
              <p className="lede">
                I&rsquo;m an <strong>Associate Application Developer at{" "}
                {profile.company}</strong>, working on back-end systems out of
                Bengaluru. I graduated from <strong>SRM University</strong> in
                2024 with a B.Tech in Computer Science with AIML
                specialisation.
              </p>
              <p className="lede">
                Off the keyboard, I&rsquo;m usually somewhere with a camera —
                most often a forest, sometimes a city, often a road. The other
                tabs in my head: cars, music, card games, the next trip.
              </p>
              <Link className="section-link" href="/about" style={{ marginTop: 22 }}>
                Read the longer version
                <ArrowRight size={16} />
              </Link>
            </div>
            <aside className="about-snippet-stats">
              <div className="stat-card">
                <h4>Day job</h4>
                <strong>{profile.role}</strong>
                <span>{profile.company}</span>
              </div>
              <div className="stat-card">
                <h4>Education</h4>
                <strong>B.Tech, CS with AIML</strong>
                <span>SRM University · 2020 – 2024</span>
              </div>
              <div className="stat-card">
                <h4>Based in</h4>
                <strong>Bengaluru</strong>
                <span>Originally Lucknow</span>
              </div>
              <div className="stat-card stat-card-tags">
                <h4>Top skills</h4>
                <ul>
                  {profile.topSkills.map((skill) => (
                    <li key={skill}>{skill}</li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </section>

        <section className="section reveal" id="worlds">
          <div className="shell">
            <div className="section-head">
              <div>
                <p className="eyebrow">The worlds I keep</p>
                <h2>
                  Six things I&rsquo;m into.
                  <br />
                  <span className="accent">One is already here.</span>
                </h2>
              </div>
              <p className="lede">
                Photography is the most built-out corner so far. The rest are
                drafts in my head — they&rsquo;ll get their own sections as I
                write things down.
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
                          {Icon && <Icon size={18} strokeWidth={1.6} />}
                        </span>
                        <span className="pursuit-status">
                          {isLive ? pursuit.detail : "Coming soon"}
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
                  <p className="eyebrow">From the journal</p>
                  <h2>
                    Field notes &<br />
                    <span className="accent">trip writing.</span>
                  </h2>
                </div>
                <p className="lede">
                  Slow blog entries about waiting in a hide, the weather of a
                  forest, gear that should disappear, and the small decisions
                  behind a photograph.
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

        <section className="contact-band reveal">
          <div className="shell-narrow">
            <p className="eyebrow">Get in touch</p>
            <h2>
              For prints, projects, or just a conversation about
              <span className="accent"> tigers and tech.</span>
            </h2>
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
