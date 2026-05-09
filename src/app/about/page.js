import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { profile } from "../data";

export const metadata = {
  title: "About",
  description:
    "About Affaan Kidwai — Oracle application developer, computer scientist, and wildlife photography storyteller from Lucknow & Bengaluru, India.",
};

export default function AboutPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="about-page-hero">
          <div className="shell">
            <p className="eyebrow">About</p>
            <h1>
              Developer mind, <span className="accent">wildlife eye.</span>
            </h1>
            <p className="lede">
              {profile.role}. {profile.education}. The day job is back-end web
              development, databases, and cloud. The other half of life is
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
                something else. I came back with one frame I couldn't stop
                looking at, and I've been chasing that feeling ever since.
              </p>
              <p>
                <strong>Most of my work is from Indian forests:</strong> the dry
                deciduous belt of the central states, lake edges in the north,
                and the small patches of green you can still find around home.
                I shoot tigers when they let me, but I'm just as happy waiting
                for a kingfisher to land on the right branch.
              </p>
              <p>
                <strong>This site is two things at once.</strong> The first is
                the photography world — galleries, trip notes, gear thoughts.
                The second is a quiet record of the developer side: backend
                systems, databases, cloud, the kind of engineering that asks
                you to be patient with state machines instead of with herons.
              </p>
              <p>
                If you'd like to talk — about a workshop, a print, a project, or
                just a forest worth visiting — please write to{" "}
                <a
                  href={`mailto:${profile.email}`}
                  style={{ color: "var(--accent)", textDecoration: "underline", textUnderlineOffset: 3 }}
                >
                  {profile.email}
                </a>
                .
              </p>
            </div>

            <aside className="about-side">
              <div className="about-card">
                <h4>Current role</h4>
                <strong>{profile.role}</strong>
                <p>Back-end systems and database work in financial services.</p>
              </div>
              <div className="about-card">
                <h4>Education</h4>
                <strong>{profile.education}</strong>
              </div>
              <div className="about-card">
                <h4>Based in</h4>
                <strong>{profile.base}</strong>
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
            <h2>What I work on when I'm not in a forest.</h2>
            <div className="skill-tags">
              {profile.skills.map((skill) => (
                <span key={skill}>{skill}</span>
              ))}
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
