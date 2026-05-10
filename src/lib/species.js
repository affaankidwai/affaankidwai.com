import { photos } from "../app/data";

// Notes / behaviour blurbs for species the user has shot. Optional — falls
// back to a generic line when missing.
const SPECIES_NOTES = {
  "Bengal Tiger":
    "The reason most wildlife photographers eventually find themselves in central India. Patient, mostly nocturnal, and only on display when they decide to be.",
  "White-throated Kingfisher":
    "A jewel of a bird. Brown body, electric-blue wings, red beak — and they perch on the same branch every morning if you can find it.",
  "Indian Paradise Flycatcher":
    "Two-foot-long tail streamers in white or rufous, depending on the morph. Fast, hard to frame through monsoon foliage.",
  "Pond Heron":
    "Almost the colour of a dry log, until they fly and the wings flash white. Wait better than we do.",
  "Great Stone-curlew":
    "Riverbank specialist. Big yellow eyes, cryptic plumage, harder to spot than any tiger.",
  "Ruddy Shelduck":
    "Winter visitor to north Indian wetlands. Stands tall on lake edges and fits the late-afternoon light perfectly.",
  "Song Thrush":
    "Spotted breast, long song. Holds a willow branch like it's a stage.",
  "Bluethroat":
    "A flash of blue and rust in the undergrowth, here for winter, gone in a blink.",
  "Bengal Tigers":
    "When they appear in pairs — siblings, mates, mother-and-cub — the calculation changes. Now you're choosing what's in frame.",
};

function speciesSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function getSpeciesIndex() {
  const map = new Map();
  for (const photo of photos) {
    const subject = photo.subject?.trim();
    if (!subject) continue;
    if (!map.has(subject)) {
      map.set(subject, {
        name: subject,
        slug: speciesSlug(subject),
        photos: [],
      });
    }
    map.get(subject).photos.push(photo);
  }
  return Array.from(map.values())
    .map((s) => ({
      ...s,
      cover:
        s.photos.find((p) => p.favorite) ??
        s.photos.find((p) => p.featured) ??
        s.photos[0],
      count: s.photos.length,
      note: SPECIES_NOTES[s.name],
    }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));
}

export function getSpeciesBySlug(slug) {
  return getSpeciesIndex().find((s) => s.slug === slug);
}

export function getAllSpeciesSlugs() {
  return getSpeciesIndex().map((s) => s.slug);
}
