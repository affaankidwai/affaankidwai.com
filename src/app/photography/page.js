import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { Gallery } from "../components/Lightbox";
import { photoCategories, photos } from "../data";

export const metadata = {
  title: "Photography",
  description:
    "The full archive — wildlife photographs from Indian forests, lakes and grasslands, by Affaan Kidwai.",
};

export default function PhotographyPage() {
  const subjects = Array.from(
    new Set(photos.map((p) => p.subject).filter(Boolean)),
  );
  const favorites = photos.filter((p) => p.favorite).length;
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="shell">
            <p className="eyebrow">Photography</p>
            <h1>The archive.</h1>
            <p className="lede">
              Tigers from the dry forest, birds from lake edges, and a few
              quiet songbirds. Tap any frame to look closer — every photo has
              its own page with the full story.
            </p>
            <div className="stats">
              <div>
                Frames
                <strong>{photos.length}</strong>
              </div>
              <div>
                Subjects
                <strong>{subjects.length}</strong>
              </div>
              <div>
                Favorites
                <strong>{favorites}</strong>
              </div>
            </div>
          </div>
        </section>

        <div className="shell">
          <Gallery photos={photos} categories={photoCategories} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
