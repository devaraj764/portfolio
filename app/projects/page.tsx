import type { Metadata } from "next";
import Link from "next/link";

import PageTransition from "@/components/PageTransition";
import Reveal from "@/components/Reveal";
import { getAllProjects } from "@/lib/content";

const description =
  "Apps and tools built by DevaRaju Maddhu — from AI agents and legal tech to full-stack platforms.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/projects" },
  openGraph: {
    title: "Projects — DevaRaju Maddhu",
    description,
    url: "/projects",
  },
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <PageTransition>
      <div className="section-title">
        <span className="accent-marker">&gt;</span>
        <h2 className="heading">Projects</h2>
      </div>

      {projects.length === 0 ? (
        <p className="muted-text">No projects yet. Check back soon.</p>
      ) : (
        <div className="card-list">
          {projects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="blog-card"
            >
              <Reveal delay={index * 0.08}>
                <div className="exp-card-header">
                  <h3 className="exp-card-title">
                    <span className="project-number">
                      #{String(index + 1).padStart(2, "0")}
                    </span>{" "}
                    {project.title}
                  </h3>
                  <span className="exp-card-duration">{project.duration}</span>
                </div>
                <p className="exp-card-description">{project.excerpt}</p>
                {project.note && (
                  <span className="note-text">Note: {project.note}</span>
                )}
                <div className="blog-card-tags" style={{ marginTop: 16 }}>
                  {project.tags.map((tag) => (
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
