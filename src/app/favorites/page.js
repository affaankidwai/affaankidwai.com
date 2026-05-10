import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { Gallery } from "../components/Lightbox";
import { favoritePhotos } from "../data";

export const metadata = {
  title: "Favorites",
  description:
    "A short, personal list of the wildlife frames I keep returning to.",
};

export default function FavoritesPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="shell">
            <p className="eyebrow">Favorites</p>
            <h1>The frames I keep returning to.</h1>
            <p className="lede">
              Out of {favoritePhotos.length > 0 ? "the whole archive" : "a growing archive"},
              these are the ones that taught me something — about patience, about
              light, or about how to be quiet in a forest. Hover for the gear,
              click for the full story.
            </p>
            <div className="stats">
              <div>
                Frames
                <strong>{favoritePhotos.length}</strong>
              </div>
              <div>
                Picked
                <strong>By Affaan</strong>
              </div>
            </div>
          </div>
        </section>

        <div className="shell">
          <Gallery photos={favoritePhotos} showFilter={false} />
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
