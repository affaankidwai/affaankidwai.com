import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteHeader } from "../../components/SiteHeader";
import { SiteFooter } from "../../components/SiteFooter";
import {
  formatPostDate,
  getAllPostSlugs,
  getPost,
} from "../../../lib/posts";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return { title: "Journal entry not found" };
  return {
    title: post.title,
    description: post.summary,
    openGraph: {
      title: post.title,
      description: post.summary,
      images: post.cover ? [post.cover] : [],
    },
  };
}

export default async function PostPage({ params }) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <>
      <SiteHeader />
      <main>
        <article className="post">
          <div className="shell" style={{ maxWidth: 760, marginInline: "auto" }}>
            <Link href="/journal" className="back-link">
              <ArrowLeft size={14} />
              All journal entries
            </Link>
          </div>

          <header className="post-hero shell">
            <div className="post-meta">
              <span>{formatPostDate(post.date)}</span>
              {post.location && (
                <>
                  <span className="dot">·</span>
                  <span>{post.location}</span>
                </>
              )}
            </div>
            <h1>{post.title}</h1>
            {post.summary && <p className="summary">{post.summary}</p>}
          </header>

          {post.cover && (
            <div className="post-cover-hero">
              <Image
                src={post.cover}
                alt=""
                width={2400}
                height={1350}
                priority
                sizes="(max-width: 1240px) 100vw, 1240px"
              />
            </div>
          )}

          <div className="shell">
            <div className="post-prose">{post.content}</div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
