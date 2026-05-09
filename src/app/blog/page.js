import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "../components/SiteHeader";
import { SiteFooter } from "../components/SiteFooter";
import { getAllPosts, formatPostDate } from "../../lib/posts";

export const metadata = {
  title: "Field Notes",
  description:
    "Long, slow trip writing about wildlife photography, forests, weather, gear, and the moments behind a frame.",
};

export default async function BlogIndex() {
  const posts = await getAllPosts();

  return (
    <>
      <SiteHeader />
      <main>
        <section className="page-hero">
          <div className="shell">
            <p className="eyebrow">Field Notes</p>
            <h1>
              The <em>slow part</em> of wildlife photography, written down.
            </h1>
            <p className="lede">
              Trip journals, weather notes, gear thoughts, and the small
              decisions that shape a photograph. Written when there's time, not
              on a schedule.
            </p>
          </div>
        </section>

        <div className="shell">
          {posts.length === 0 ? (
            <div className="blog-list">
              <p style={{ color: "var(--ink-soft)", fontSize: "1.1rem", padding: "40px 0" }}>
                No posts yet. Drop an <code>.mdx</code> file in{" "}
                <code>content/posts/</code> and it will show up here.
              </p>
            </div>
          ) : (
            <div className="blog-list">
              {posts.map((post) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-row">
                  <div className="cover">
                    {post.cover && (
                      <Image
                        src={post.cover}
                        alt=""
                        width={1200}
                        height={900}
                        sizes="(max-width: 1000px) 100vw, 40vw"
                      />
                    )}
                  </div>
                  <div>
                    <div className="post-meta">
                      <span>{formatPostDate(post.date)}</span>
                      {post.location && (
                        <>
                          <span className="dot">·</span>
                          <span>{post.location}</span>
                        </>
                      )}
                    </div>
                    <h2>{post.title}</h2>
                    {post.summary && <p>{post.summary}</p>}
                    {Array.isArray(post.tags) && post.tags.length > 0 && (
                      <div className="tags">
                        {post.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    )}
                    <span className="read-more">
                      Read note
                      <ArrowRight size={14} />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
