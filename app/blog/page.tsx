import type { Metadata } from "next";
import Link from "next/link";

import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import { getAllPosts } from "@/lib/content";

const description =
  "Thoughts on web development, AI engineering, LangChain, LangGraph, and building modern applications.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog — DevaRaju Maddhu",
    description,
    url: "/blog",
  },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageTransition>
      <div className="section-title">
        <span className="accent-marker">&gt;</span>
        <h2 className="heading">Blog</h2>
      </div>

      {posts.length === 0 ? (
        <p className="muted-text">No posts yet. Check back soon.</p>
      ) : (
        <div className="blog-list">
          {posts.map((post, i) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
              <Reveal delay={i * 0.08}>
                <div className="blog-card-date">{post.date}</div>
                <h3>{post.title}</h3>
                <p>{post.excerpt}</p>
                <div className="blog-card-tags">
                  {post.tags.map((tag) => (
                    <span key={tag} className="blog-card-tag">
                      {tag}
                    </span>
                  ))}
                </div>
              </Reveal>
            </Link>
          ))}
        </div>
      )}
    </PageTransition>
  );
}
