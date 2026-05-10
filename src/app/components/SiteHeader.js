import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "/photography", label: "Photography" },
  { href: "/species", label: "Species" },
  { href: "/trips", label: "Trips" },
  { href: "/journal", label: "Journal" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand" href="/" aria-label="Affaan Kidwai home">
        Affaan Kidwai
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
