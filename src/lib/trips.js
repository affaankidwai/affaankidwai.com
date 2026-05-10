import { promises as fs } from "node:fs";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const TRIPS_DIR = path.join(process.cwd(), "content", "trips");

const mdxOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

async function readTripFile(slug) {
  const filePath = path.join(TRIPS_DIR, `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
}

export async function getAllTripSlugs() {
  try {
    const entries = await fs.readdir(TRIPS_DIR);
    return entries
      .filter((file) => file.endsWith(".mdx") && !file.startsWith("."))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export async function getAllTrips() {
  const slugs = await getAllTripSlugs();
  const trips = await Promise.all(
    slugs.map(async (slug) => {
      const source = await readTripFile(slug);
      const { frontmatter } = await compileMDX({ source, options: mdxOptions });
      return { slug, ...frontmatter };
    }),
  );
  return trips.sort((a, b) => {
    const ad = new Date(a.date || 0).getTime();
    const bd = new Date(b.date || 0).getTime();
    return bd - ad;
  });
}

export async function getTrip(slug) {
  let source;
  try {
    source = await readTripFile(slug);
  } catch (error) {
    if (error.code === "ENOENT") return null;
    throw error;
  }
  const { content, frontmatter } = await compileMDX({
    source,
    options: mdxOptions,
  });
  return { slug, content, ...frontmatter };
}

export function formatTripDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    month: "long",
    year: "numeric",
  });
}
