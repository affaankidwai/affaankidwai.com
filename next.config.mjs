/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // Photos are pre-resized in /public/gallery (max 2400px). On Vercel the
    // optimizer still kicks in; in local dev on a non-HFS+ filesystem the
    // optimizer cache can be confused by macOS AppleDouble (._*) files —
    // setting `unoptimized` to true on dev keeps the dev UX consistent.
    unoptimized: process.env.NODE_ENV !== "production",
  },
};

export default nextConfig;
