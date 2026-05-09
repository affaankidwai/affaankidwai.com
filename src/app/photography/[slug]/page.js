import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Camera, MapPin } from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { fieldNotes, featuredPhotos } from "../../data";

export function generateStaticParams() { return fieldNotes.map((note) => ({ slug: note.slug })); }

export function generateMetadata({ params }) {
  const note = fieldNotes.find((item) => item.slug === params.slug);
  return { title: note ? `${note.title} | Affaan Kidwai` : "Field Note | Affaan Kidwai", description: note?.summary };
}

export default function FieldNotePage({ params }) {
  const note = fieldNotes.find((item) => item.slug === params.slug) ?? fieldNotes[0];
  return (
    <main>
      <SiteHeader />
      <article className="field-note-page"><Link className="back-link" href="/photography#journal"><ArrowLeft size={17} /> Back to journal</Link><header><p className="eyebrow"><Camera size={16} /> {note.date}</p><h1>{note.title}</h1><p>{note.summary}</p></header><Image className="field-note-cover" src={note.image} alt="" width={1400} height={900} priority /><section className="field-note-body"><p>This page is a ready-to-write template for an actual trip post. Add the route, weather, sightings, camera settings, and the small decisions that shaped the final photographs.</p><p>The best wildlife stories are usually built from restraint: fewer words, stronger images, and enough field context to make the viewer feel the wait before the shutter.</p><div className="inline-photo-strip">{featuredPhotos.slice(0, 3).map((photo) => <Image key={photo.title} src={photo.image} alt="" width={700} height={460} />)}</div><div className="location-callout"><MapPin size={20} /><span>Replace this with the trip location, reserve, trail, or hide.</span></div></section></article>
    </main>
  );
}
