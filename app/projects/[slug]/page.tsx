import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BiArrowBack, BiShow } from "react-icons/bi";

import Markdown from "@/components/Markdown";
import PageTransition from "@/components/PageTransition";
import { getAllProjects, getProjectBySlug } from "@/lib/content";

type Params = { params: Promise<{ slug: string }> };

// Fully prerendered at build time: unknown slugs 404 without hitting the
// filesystem at request time.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return { title: "Project not found" };

  const description =
    project.excerpt || `Details about ${project.title} by DevaRaju Maddhu.`;

  return {
    title: project.title,
    description,
    alternates: { canonical: `/projects/${slug}` },
    openGraph: {
      title: `${project.title} — DevaRaju Maddhu`,
      description,
      url: `/projects/${slug}`,
    },
  };
}

export default async function ProjectDetailPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <PageTransition>
      <Link href="/projects" className="blog-post-back">
        <BiArrowBack size="18" /> Back to projects
      </Link>

      <div className="blog-post-header">
        <h1>{project.title}</h1>
        <div className="blog-post-meta">
          {project.company && (
            <span className="blog-post-date">{project.company}</span>
          )}
          {project.duration && (
            <span className="blog-post-date">{project.duration}</span>
          )}
          {project.visit_link && (
            <a
              href={project.visit_link}
              target="_blank"
              rel="noopener noreferrer"
              className="link-button"
              style={{ fontSize: "0.82rem", padding: "4px 12px" }}
            >
              <BiShow size="14" /> Visit
            </a>
          )}
        </div>
        <div className="blog-card-tags" style={{ marginTop: 12 }}>
          {project.tags.map((tag) => (
            <span key={tag} className="blog-card-tag">
              {tag}
            </span>
          ))}
        </div>
      </div>

      <Markdown>{project.content}</Markdown>
    </PageTransition>
  );
}
