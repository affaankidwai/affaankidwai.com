import Link from "next/link";
import { Aperture } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/photography", label: "Photography" },
  { href: "/blog", label: "Field Notes" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-lockup" href="/" aria-label="Affaan Kidwai home">
        <span className="brand-mark">
          <Aperture size={16} strokeWidth={1.8} />
        </span>
        <span>
          <strong>Affaan Kidwai</strong>
          <small>Wildlife · Field Notes</small>
        </span>
      </Link>
      <nav aria-label="Primary navigation">
        {nav.map((item) => (
          <Link key={item.href} href={item.href}>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <a className="contact-link" href="mailto:kidwaiaffaan@gmail.com">
          Contact
        </a>
      </div>
    </header>
  );
}
