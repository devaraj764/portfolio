// Import all .md files from the blog directory at build time
const modules = import.meta.glob('./blog/*.md', { query: '?raw', eager: true });

/**
 * Simple front-matter parser (avoids gray-matter Buffer issues in browser).
 * Expects YAML between opening `---` and closing `---`.
 */
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

    // Parse array values like [a, b, c]
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

function loadPosts() {
  const posts = [];

  for (const [path, mod] of Object.entries(modules)) {
    const raw = typeof mod === 'string' ? mod : mod.default;
    const slug = path.replace('./blog/', '').replace('.md', '');
    const { data, content } = parseFrontMatter(raw);

    posts.push({
      slug,
      title: data.title || slug,
      date: data.date || '',
      tags: Array.isArray(data.tags) ? data.tags : [],
      excerpt: data.excerpt || '',
      content,
    });
  }

  // Sort by date descending
  posts.sort((a, b) => (b.date > a.date ? 1 : -1));
  return posts;
}

const allPosts = loadPosts();

export function getAllPosts() {
  return allPosts;
}

export function getPostBySlug(slug) {
  return allPosts.find((p) => p.slug === slug) || null;
}
