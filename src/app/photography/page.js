import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Camera, Compass, Image as ImageIcon, PenLine } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { featuredPhotos, fieldNotes } from "../data";

export const metadata = { title: "Photography | Affaan Kidwai", description: "Enter the wildlife photography world of Affaan Kidwai: gallery, field notes, trip journals, and visual essays." };

export default function PhotographyPage() {
  return (
    <main>
      <SiteHeader />
      <section className="photo-world-hero"><Image src={featuredPhotos[1].image} alt="" width={1800} height={1200} priority /><div className="photo-world-copy"><p className="eyebrow"><Compass size={16} /> Enter the world</p><h1>Photography by Affaan.</h1><p>A living archive for wildlife frames, trip journals, photo essays, and the blue-green atmosphere of being outside before the rest of the day wakes up.</p></div></section>
      <section className="section-shell stats-strip" aria-label="Photography highlights"><div><Camera size={20} /><strong>Top Frames</strong><span>Curated gallery-ready images</span></div><div><PenLine size={20} /><strong>Trip Blogs</strong><span>Photo-led field journals</span></div><div><ImageIcon size={20} /><strong>Visual Essays</strong><span>Stories built around sets</span></div></section>
      <section className="section-shell"><div className="section-heading-row"><div><p className="eyebrow">Gallery</p><h2>Top photographs</h2></div><p className="section-note">Replace these starter visuals with your own shots whenever you are ready; the layout is already built for strong wildlife images.</p></div><div className="gallery-grid">{featuredPhotos.map((photo, index) => <article className="gallery-card" key={photo.title}><Image src={photo.image} alt={`${photo.title} wildlife photograph`} width={900} height={1200} /><div><span>{photo.species}</span><h3>{photo.title}</h3><p>{photo.place}</p></div><small>{String(index + 1).padStart(2, "0")}</small></article>)}</div></section>
      <section className="section-shell journal-section" id="journal"><div className="section-heading-row"><div><p className="eyebrow">Journal</p><h2>Trip blogs with attached photos</h2></div><p className="section-note">These are starter entries and content patterns for your future forest trips, safaris, gear notes, and editing breakdowns.</p></div><div className="journal-list">{fieldNotes.map((note) => <article className="journal-row" key={note.slug}><Image src={note.image} alt="" width={900} height={600} /><div><span>{note.date}</span><h3>{note.title}</h3><p>{note.summary}</p><div className="tag-row">{note.tags.map((tag) => <small key={tag}>{tag}</small>)}</div></div><Link href={`/photography/${note.slug}`} aria-label={`Read ${note.title}`}><ArrowRight size={20} /></Link></article>)}</div></section>
    </main>
  );
}
