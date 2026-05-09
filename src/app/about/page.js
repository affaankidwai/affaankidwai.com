import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { profile } from "../data";

export const metadata = {
  title: "About",
  description:
    "About Affaan Kidwai — Associate Application Developer at Oracle Financial Services Software, wildlife photographer, and CS-with-AIML graduate from SRM University.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="about-page-hero">
          <div className="shell">
            <p className="eyebrow">About</p>
            <h1>Affaan Kidwai.</h1>
            <p className="lede">
              Associate Application Developer at {profile.company}. Computer
              Science with AIML graduate from SRM University. The day job is
              back-end systems and databases. The other half of life is
              forests, dawn light, and slow looking.
            </p>
          </div>
        </section>

        <section className="about-grid">
          <div className="shell about-grid-inner">
            <div className="about-prose">
              <p>
                I started photographing wildlife the way most people start any
                slow craft — by accident, on a trip that was meant to be about
                something else. I came back with one frame I couldn&rsquo;t
                stop looking at, and I&rsquo;ve been chasing that feeling ever
                since.
              </p>
              <p>
                <strong>Most of my work is from Indian forests:</strong> the
                dry deciduous belt of the central states, lake edges in the
                north, and the small patches of green you can still find
                around home. I shoot tigers when they let me, but I&rsquo;m
                just as happy waiting for a kingfisher to land on the right
                branch.
              </p>
              <p>
                <strong>By day I&rsquo;m a software engineer.</strong> Joined
                Oracle Financial Services Software in {profile.roleSince} as
                an Associate Application Developer, working on back-end
                systems out of Bengaluru. Before that — four years at SRM
                University doing a B.Tech in Computer Science with AIML
                specialisation, plus the usual stack of certifications:
                Advanced React, AWS Cloud Operations, Machine Learning,
                Database Foundations.
              </p>
              <p>
                <strong>This site is two things at once.</strong> The first is
                the photography world — galleries, trip notes, gear thoughts.
                The second is a quiet record of the developer side, plus the
                other corners (cars, music, cards, travel) that I&rsquo;ll
                fill in over time.
              </p>
              <p>
                If you&rsquo;d like to talk — about a workshop, a print, a
                project, or just a forest worth visiting — please write to{" "}
                <a
                  href={`mailto:${profile.email}`}
                  style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: 4 }}
                >
                  {profile.email}
                </a>
                .
              </p>
            </div>

            <aside className="about-side">
              <div className="about-card">
                <h4>Currently</h4>
                <strong>{profile.role}</strong>
                <p>
                  {profile.company} · Bengaluru. Back-end systems and database
                  work in financial services, since {profile.roleSince}.
                </p>
              </div>
              <div className="about-card">
                <h4>Education</h4>
                {profile.education.map((entry) => (
                  <div key={entry.school} style={{ marginTop: 14 }}>
                    <strong>{entry.school}</strong>
                    <p>
                      {entry.degree} · {entry.years}
                    </p>
                  </div>
                ))}
              </div>
              <div className="about-card">
                <h4>Based in</h4>
                <strong>Bengaluru</strong>
                <p>From Lucknow, Uttar Pradesh originally.</p>
              </div>
              <a
                className="about-card"
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none" }}
              >
                <span>
                  <h4>Elsewhere</h4>
                  <strong>LinkedIn</strong>
                </span>
                <ArrowUpRight size={18} color="var(--accent)" />
              </a>
            </aside>
          </div>
        </section>

        <section className="skills">
          <div className="shell">
            <p className="eyebrow">Day job · skills</p>
            <h2>What I work on.</h2>
            <div className="skill-tags">
              {profile.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
            <p className="eyebrow" style={{ marginTop: 56 }}>
              Certifications
            </p>
            <h2 style={{ fontSize: "clamp(1.4rem, 2.2vw, 1.8rem)" }}>
              Coursework.
            </h2>
            <div className="skill-tags">
              {profile.certifications.map((cert) => (
                <span key={cert}>{cert}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
