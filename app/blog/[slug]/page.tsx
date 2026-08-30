import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BiArrowBack } from "react-icons/bi";

import Markdown from "@/components/Markdown";
import PageTransition from "@/components/PageTransition";
import { getAllPosts, getPostBySlug } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Post not found" };

  const description = post.excerpt || `Read ${post.title} by DevaRaju Maddhu.`;

  return {
    title: post.title,
    description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: `${post.title} — DevaRaju Maddhu`,
      description,
      url: `/blog/${slug}`,
      publishedTime: post.date || undefined,
      tags: post.tags,
    },
  };
}

export default async function BlogPostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <PageTransition>
      <Link href="/blog" className="blog-post-back">
        <BiArrowBack size="18" /> Back to blog
      </Link>

      <div className="blog-post-header">
        <h1>{post.title}</h1>
        <div className="blog-post-meta">
          <span className="blog-post-date">{post.date}</span>
          <div className="blog-card-tags">
            {post.tags.map((tag) => (
              <span key={tag} className="blog-card-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <Markdown>{post.content}</Markdown>
    </PageTransition>
  );
}
