import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { Gallery } from "../components/Lightbox";
import { photos } from "../data";

export const metadata = {
  title: "Photography",
  description:
    "The full archive — wildlife photographs from Indian forests, lakes and grasslands, by Affaan Kidwai.",
};

export default function PhotographyPage() {
  const subjects = Array.from(
    new Set(photos.map((p) => p.subject).filter(Boolean)),
  );
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="shell">
            <p className="eyebrow">The archive</p>
            <h1>
              All <span className="accent">frames,</span> in one place.
            </h1>
            <p className="lede">
              Tigers from the dry forest. Birds from monsoon canopies and lake
              edges. The full archive of photographs I keep coming back to,
              tap any frame to look closer.
            </p>
            <div className="stats">
              <div>
                Photographs
                <strong>{photos.length}</strong>
              </div>
              <div>
                Subjects
                <strong>{subjects.length}</strong>
              </div>
              <div>
                Years
                <strong>2024–25</strong>
              </div>
            </div>
          </div>
        </section>

        <div className="shell">
          <Gallery photos={photos} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
