import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Binoculars, Camera, Database, Leaf, Map, Music2, Sparkles } from "lucide-react";
import { SiteHeader } from "./components/SiteHeader";
import { featuredPhotos, fieldNotes, profile, upcomingInterests } from "./data";

export default function Home() {
  return (
    <main>
      <SiteHeader />
      <section className="hero-section">
        <div className="hero-media" aria-hidden="true">
          <Image src={featuredPhotos[0].image} alt="" width={1800} height={1200} className="hero-image" priority />
          <div className="lens-orbit lens-orbit-one" /><div className="lens-orbit lens-orbit-two" />
        </div>
        <div className="hero-content">
          <p className="eyebrow"><Leaf size={16} /> affaankidwai.com</p>
          <h1>Affaan Kidwai</h1>
          <p className="hero-copy">A developer with a field notebook, building a blue-green corner of the web for wildlife photographs, travel stories, and the quiet patience behind a memorable frame.</p>
          <div className="hero-actions"><Link className="primary-action" href="/photography">Enter photography <ArrowRight size={18} /></Link><Link className="secondary-action" href="/about">About Affaan</Link></div>
        </div>
        <aside className="hero-panel" aria-label="Profile snapshot"><span>Oracle application developer</span><strong>Computer Science + AIML</strong><p>{profile.location}</p></aside>
      </section>

      <section className="section-shell intro-grid"><div><p className="eyebrow"><Sparkles size={16} /> The first world</p><h2>Wildlife first, with room for every obsession later.</h2></div><p>This version gives the photography section the spotlight: top images, trip journals, field notes, and a visual language that feels close to forests, water, low light, and movement. Cars, music, cards, and travel can slide in next without disturbing the main identity.</p></section>

      <section className="marquee-band" aria-label="Future interests"><div className="marquee-track">{[...upcomingInterests, ...upcomingInterests].map((interest, index) => <span key={`${interest}-${index}`}>{interest === "Music" ? <Music2 size={18} /> : <Map size={18} />}{interest}</span>)}</div></section>

      <section className="section-shell feature-split"><div className="photo-stack">{featuredPhotos.slice(0, 3).map((photo, index) => <article className="stack-card" key={photo.title}><Image src={photo.image} alt={`${photo.title} wildlife scene`} width={900} height={600} /><div><span>{`0${index + 1}`}</span><strong>{photo.title}</strong></div></article>)}</div><div className="feature-copy"><p className="eyebrow"><Camera size={16} /> Photography system</p><h2>Gallery, journal, and story structure in one place.</h2><p>Each image has room for title, place, species, and mood. Each trip can become a blog-style entry with photos attached, field notes, and the kind of context that makes the photograph feel lived in.</p><Link className="text-link" href="/photography">Explore the photo world <ArrowRight size={17} /></Link></div></section>

      <section className="section-shell note-section"><div className="section-heading-row"><div><p className="eyebrow"><Binoculars size={16} /> Latest field notes</p><h2>Trip writing that can grow around the photographs.</h2></div><Link className="ghost-button" href="/photography#journal">View journal</Link></div><div className="note-grid">{fieldNotes.map((note) => <article className="note-card" key={note.slug}><Image src={note.image} alt="" width={900} height={600} /><div className="note-card-body"><span>{note.date}</span><h3>{note.title}</h3><p>{note.summary}</p></div></article>)}</div></section>

      <section className="section-shell profile-band"><Database size={24} /><p>From the LinkedIn profile: {profile.role}, trained in {profile.education}, with strengths across back-end web development, database systems, cloud operations, React, and machine learning.</p></section>
    </main>
  );
}
