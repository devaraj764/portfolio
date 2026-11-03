import "server-only";

import { projectFiles } from "./generated/content-files";
import { list, parseFrontMatter, str } from "./frontmatter";

export type Project = {
  slug: string;
  order: number;
  title: string;
  company: string;
  duration: string;
  tags: string[];
  excerpt: string;
  visit_link: string;
  github: string;
  demo: string;
  note: string;
  content: string;
};

const allProjects: Project[] = Object.entries(projectFiles)
  .map(([slug, raw]) => {
    const { data, content } = parseFrontMatter(raw);
    return {
      slug,
      order: Number.parseInt(str(data.order), 10) || 999,
      title: str(data.title) || slug,
      company: str(data.company),
      duration: str(data.duration),
      tags: list(data.tags),
      excerpt: str(data.excerpt),
      visit_link: str(data.visit_link),
      github: str(data.github),
      demo: str(data.demo),
      note: str(data.note),
      content,
    };
  })
  .sort((a, b) => a.order - b.order);

export function getAllProjects(): Project[] {
  return allProjects;
}

export function getProjectBySlug(slug: string): Project | null {
  return allProjects.find((p) => p.slug === slug) ?? null;
}
