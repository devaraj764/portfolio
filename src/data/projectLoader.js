const modules = import.meta.glob('./projects/*.md', { query: '?raw', eager: true });

function parseFrontMatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const yamlBlock = match[1];
  const content = match[2].trim();
  const data = {};

  for (const line of yamlBlock.split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();

    if (value.startsWith('[') && value.endsWith(']')) {
      value = value
        .slice(1, -1)
        .split(',')
        .map((s) => s.trim());
    }

    data[key] = value;
  }

  return { data, content };
}

function loadProjects() {
  const projects = [];

  for (const [path, mod] of Object.entries(modules)) {
    const raw = typeof mod === 'string' ? mod : mod.default;
    const slug = path.replace('./projects/', '').replace('.md', '');
    const { data, content } = parseFrontMatter(raw);

    projects.push({
      slug,
      order: parseInt(data.order, 10) || 999,
      title: data.title || slug,
      company: data.company || '',
      duration: data.duration || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      excerpt: data.excerpt || '',
      visit_link: data.visit_link || '',
      github: data.github || '',
      note: data.note || '',
      content,
    });
  }

  projects.sort((a, b) => a.order - b.order);
  return projects;
}

const allProjects = loadProjects();

export function getAllProjects() {
  return allProjects;
}

export function getProjectBySlug(slug) {
  return allProjects.find((p) => p.slug === slug) || null;
}
