import Link from "next/link";
import { profile } from "../data";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div>
          <h4>Affaan Kidwai</h4>
          <h3>Developer, photographer.</h3>
          <p>
            A personal corner of the web for the work, the photographs, and
            the worlds I&rsquo;ll add to over time.
          </p>
        </div>
        <div>
          <h4>Wander</h4>
          <ul>
            <li><Link href="/photography">Photography</Link></li>
            <li><Link href="/blog">Field Notes</Link></li>
            <li><Link href="/about">About</Link></li>
            <li><a href={`mailto:${profile.email}`}>Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Elsewhere</h4>
          <ul>
            <li>
              <a href={profile.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
            </li>
            <li>
              <a href={`mailto:${profile.email}`}>{profile.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="shell colophon">
        <span>© {new Date().getFullYear()} Affaan Kidwai</span>
        <span>Built on Next.js · Hosted on Vercel</span>
      </div>
    </footer>
  );
}
