import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import { Gallery } from "../../components/Lightbox";
import {
  getAllSpeciesSlugs,
  getSpeciesBySlug,
} from "../../../lib/species";

export function generateStaticParams() {
  return getAllSpeciesSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);
  if (!species) return { title: "Species not found" };
  return {
    title: species.name,
    description:
      species.note ||
      `${species.count} photographs of ${species.name} from Affaan Kidwai.`,
  };
}

export default async function SpeciesPage({ params }) {
  const { slug } = await params;
  const species = getSpeciesBySlug(slug);
  if (!species) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="shell">
            <Link href="/species" className="back-link">
              <ArrowLeft size={14} />
              All species
            </Link>
            <p className="eyebrow">Species</p>
            <h1>{species.name}.</h1>
            {species.note && <p className="lede">{species.note}</p>}
            <div className="stats">
              <div>
                Frames
                <strong>{species.count}</strong>
              </div>
            </div>
          </div>
        </section>

        <div className="shell">
          <Gallery photos={species.photos} showFilter={false} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
