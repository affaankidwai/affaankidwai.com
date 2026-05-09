import { promises as fs } from "node:fs";
import path from "node:path";
import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

const mdxOptions = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm],
  },
};

async function readPostFile(slug) {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  return fs.readFile(filePath, "utf8");
}

export async function getAllPostSlugs() {
  try {
    const entries = await fs.readdir(POSTS_DIR);
    return entries
      .filter((file) => file.endsWith(".mdx") && !file.startsWith("."))
      .map((file) => file.replace(/\.mdx$/, ""));
  } catch (error) {
    if (error.code === "ENOENT") return [];
    throw error;
  }
}

export async function getAllPosts() {
  const slugs = await getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const source = await readPostFile(slug);
      const { frontmatter } = await compileMDX({ source, options: mdxOptions });
      return { slug, ...frontmatter };
    }),
  );
  return posts.sort((a, b) => {
    const ad = new Date(a.date || 0).getTime();
    const bd = new Date(b.date || 0).getTime();
    return bd - ad;
  });
}

export async function getPost(slug) {
  let source;
  try {
    source = await readPostFile(slug);
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

export function formatPostDate(value) {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return value;
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
