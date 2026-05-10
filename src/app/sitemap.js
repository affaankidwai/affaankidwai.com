import { getAllPostSlugs } from "../lib/posts";
import { getAllSpeciesSlugs } from "../lib/species";
import { getAllTripSlugs } from "../lib/trips";
import { photos } from "./data";

const baseUrl = "https://affaankidwai.com";

function route(path, priority = 0.7) {
  return {
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority,
  };
}

export default async function sitemap() {
  const [postSlugs, tripSlugs] = await Promise.all([
    getAllPostSlugs(),
    getAllTripSlugs(),
  ]);

  return [
    route("/", 1),
    route("/photography", 0.95),
    route("/favorites", 0.86),
    route("/species", 0.84),
    route("/trips", 0.82),
    route("/journal", 0.8),
    route("/about", 0.72),
    ...photos.map((photo) => route(`/photos/${photo.slug}`, 0.68)),
    ...getAllSpeciesSlugs().map((slug) => route(`/species/${slug}`, 0.62)),
    ...tripSlugs.map((slug) => route(`/trips/${slug}`, 0.64)),
    ...postSlugs.map((slug) => route(`/journal/${slug}`, 0.64)),
  ];
}
