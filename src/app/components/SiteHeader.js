import Link from "next/link";
import { Aperture, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

const nav = [
  { href: "/", label: "Home" },
  { href: "/photography", label: "Photography" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <Link className="brand-lockup" href="/" aria-label="Affaan Kidwai home">
        <span className="brand-mark"><Aperture size={18} strokeWidth={2.4} /></span>
        <span><strong>Affaan Kidwai</strong><small>Wildlife Photography</small></span>
      </Link>
      <nav aria-label="Primary navigation">
        {nav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}
      </nav>
      <div className="header-actions">
        <ThemeToggle />
        <a className="contact-link" href="mailto:kidwaiaffaan@gmail.com">Contact <ArrowUpRight size={15} /></a>
      </div>
    </header>
  );
}
