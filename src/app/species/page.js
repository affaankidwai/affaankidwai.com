import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { photoSrc } from "../data";
import { getSpeciesIndex } from "../../lib/species";

export const metadata = {
  title: "Species",
  description:
    "A small archive of the wildlife I've photographed — Bengal tigers, white-throated kingfishers, paradise flycatchers, and more.",
};

export default function SpeciesIndexPage() {
  const species = getSpeciesIndex();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="shell">
            <p className="eyebrow">Species</p>
            <h1>The wildlife I&rsquo;ve photographed.</h1>
            <p className="lede">
              Grouped by subject. The big cats, the kingfishers, the songbirds,
              the slow waders. Click any species to see the frames I have of
              them.
            </p>
            <div className="stats">
              <div>
                Species
                <strong>{species.length}</strong>
              </div>
              <div>
                Frames
                <strong>{species.reduce((acc, s) => acc + s.count, 0)}</strong>
              </div>
            </div>
          </div>
        </section>

        <div className="shell species-grid">
          {species.map((s) => (
            <Link
              key={s.slug}
              href={`/species/${s.slug}`}
              className="species-card"
            >
              <div className="species-cover">
                <Image
                  src={photoSrc(s.cover)}
                  alt={s.name}
                  width={s.cover.width}
                  height={s.cover.height}
                  sizes="(max-width: 700px) 100vw, (max-width: 1100px) 50vw, 33vw"
                />
              </div>
              <div className="species-body">
                <h3>{s.name}</h3>
                <p>
                  <span>{s.count} {s.count === 1 ? "frame" : "frames"}</span>
                  <span aria-hidden="true">
                    View <ArrowRight size={14} />
                  </span>
                </p>
              </div>
            </Link>
          ))}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
