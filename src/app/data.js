// All site content lives in this file. To rename a photo, edit its `title` /
// `subject` / `place`. To add a new one: drop the file into /public/gallery/
// and append an entry below. To feature a photo on the home page, set
// `featured: true`.

export const profile = {
  name: "Affaan Kidwai",
  firstName: "Affaan",
  email: "kidwaiaffaan@gmail.com",
  linkedin: "https://www.linkedin.com/in/affaankidwai",
  role: "Associate Application Developer",
  company: "Oracle Financial Services Software",
  roleSince: "June 2024",
  hometown: "Lucknow, Uttar Pradesh",
  base: "Bengaluru, Karnataka",
  education: [
    {
      school: "SRM University",
      degree: "B.Tech, Computer Science with AIML specialisation",
      years: "2020 – 2024",
    },
    {
      school: "Delhi Public School, India",
      degree: "Class 12, PCM",
      years: "until 2020",
    },
  ],
  topSkills: [
    "Back-end web development",
    "Database management",
    "Oracle Database",
  ],
  skills: [
    "Back-end web development",
    "Database systems",
    "Oracle Database",
    "React",
    "Cloud operations",
    "Machine learning",
  ],
  certifications: [
    "Advanced React",
    "Web Development Bootcamp",
    "AWS Academy Cloud Operations",
    "Machine Learning A-Z",
    "Database Foundations",
  ],
};

// The "worlds" surfaced on the home page. Photography is live and links to
// the gallery; the rest are placeholders Affaan will fill in over time.
export const pursuits = [
  {
    slug: "photography",
    title: "Photography",
    eyebrow: "Wildlife · India",
    description:
      "Bengal tigers from the dry forest. Kingfishers in winter light. Paradise flycatchers through tangled branches. Frames I keep coming back to.",
    href: "/photography",
    cover: "/gallery/IMG_8409.jpg",
    status: "live",
    detail: "38 frames · 2024 – 25",
  },
  {
    slug: "tech",
    title: "Tech & Code",
    eyebrow: "Backend · Databases · Cloud",
    description:
      "Notes on Oracle, AWS, React, and the systems I work on by day.",
    status: "soon",
  },
  {
    slug: "travel",
    title: "Travel",
    eyebrow: "Forests · Cities · Roads",
    description:
      "Trip writing from across India and beyond — places, weather, and the small details.",
    status: "soon",
  },
  {
    slug: "cars",
    title: "Cars",
    eyebrow: "Engines · Roads · Drives",
    description:
      "A long-running interest. Drives, builds, and the engines that get me out of bed.",
    status: "soon",
  },
  {
    slug: "music",
    title: "Music",
    eyebrow: "Listening · Notes",
    description:
      "Albums I keep returning to and concerts that mattered.",
    status: "soon",
  },
  {
    slug: "cards",
    title: "Cards",
    eyebrow: "Games · Strategy",
    description:
      "The card games I play and the hands I won't forget.",
    status: "soon",
  },
];

// Photo entries. Width/Height are the post-resize dimensions (next/image needs
// them for layout). Subject/place are optional — leave blank if you don't want
// a label, the UI handles that gracefully.
export const photos = [
  {
    id: "IMG_0757",
    title: "On the trail",
    subject: "Bengal Tiger",
    place: "Central India",
    width: 2400,
    height: 1547,
    featured: true,
  },
  {
    id: "IMG_8409",
    title: "Eyes of the dry forest",
    subject: "Bengal Tiger",
    place: "Central India",
    width: 2400,
    height: 1600,
    featured: true,
  },
  {
    id: "IMG_9492",
    title: "Among the red bushes",
    subject: "Bengal Tiger",
    place: "Ranthambore foothills",
    width: 2400,
    height: 1600,
    featured: true,
  },
  {
    id: "IMG_8364",
    title: "On the trail",
    subject: "Bengal Tiger",
    place: "Forest road",
    width: 2400,
    height: 1600,
    featured: true,
  },
  {
    id: "IMG_8761",
    title: "A long yawn",
    subject: "Bengal Tiger",
    place: "Ranthambore",
    width: 2400,
    height: 1600,
    featured: true,
  },
  {
    id: "IMG_9342",
    title: "Two by the water",
    subject: "Bengal Tigers",
    place: "Lakeside grassland",
    width: 2400,
    height: 1600,
    featured: true,
  },
  {
    id: "IMG_0198",
    title: "Kingfisher in winter light",
    subject: "White-throated Kingfisher",
    place: "",
    width: 2400,
    height: 1600,
    featured: true,
  },
  {
    id: "IMG_3236",
    title: "Through the branches",
    subject: "Indian Paradise Flycatcher",
    place: "",
    width: 2400,
    height: 1600,
  },
  {
    id: "IMG_4466",
    title: "Golden hour at the bank",
    subject: "Ruddy Shelduck",
    place: "",
    width: 2400,
    height: 1600,
  },
  {
    id: "IMG_8579",
    title: "The slow approach",
    subject: "Bengal Tiger",
    place: "",
    width: 1600,
    height: 2400,
  },
  {
    id: "IMG_8880",
    title: "Resting pair",
    subject: "Bengal Tigers",
    place: "",
    width: 2400,
    height: 1600,
  },
  {
    id: "IMG_2708",
    title: "Quiet wait",
    subject: "Pond Heron",
    place: "",
    width: 2400,
    height: 1600,
  },
  {
    id: "IMG_9744",
    title: "Stones and shore",
    subject: "Great Stone-curlew",
    place: "",
    width: 2400,
    height: 1600,
  },
  {
    id: "IMG_1942",
    title: "Songbird in willow",
    subject: "Song Thrush",
    place: "",
    width: 2400,
    height: 1600,
  },
  {
    id: "IMG_3861",
    title: "Forest floor",
    subject: "",
    place: "",
    width: 2400,
    height: 1600,
  },
  // Untitled — set the title/subject/place when you have a moment.
  { id: "IMG_0243", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_0244", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_0257", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_1927", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_1934", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_1956", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_1988", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_3252", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_3336", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_4834", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_7531", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_8346", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_8501", title: "", subject: "Bengal Tiger", place: "", width: 2400, height: 1600 },
  { id: "IMG_8686", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_8938", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_8986", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_9036", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_9036-2", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_9101", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_9458", title: "", subject: "Bengal Tiger", place: "", width: 2400, height: 1600 },
  { id: "IMG_9552", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_9574", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_9585", title: "", subject: "", place: "", width: 2400, height: 1600 },
  { id: "IMG_9585-2", title: "", subject: "", place: "", width: 2400, height: 1600 },
];

export function photoSrc(photo) {
  return `/gallery/${photo.id}.jpg`;
}

export function photoLabel(photo, index) {
  if (photo.title) return photo.title;
  return `Frame ${String(index + 1).padStart(2, "0")}`;
}

export const featuredPhotos = photos.filter((p) => p.featured);

// The single static hero image on the home page. Change this `id` to swap
// the photo, or set `featured: true` on a different photo above.
export const heroPhoto =
  photos.find((p) => p.id === "IMG_0757") ?? photos[0];
