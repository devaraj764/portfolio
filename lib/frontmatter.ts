export type FrontMatter = Record<string, string | string[]>;

/**
 * Minimal YAML front-matter parser for the flat `key: value` blocks used by the
 * markdown in `content/`. Values wrapped in `[...]` are parsed as string lists,
 * including the multi-line form used by `tags:`.
 */
export function parseFrontMatter(raw: string): {
  data: FrontMatter;
  content: string;
} {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/);
  if (!match) return { data: {}, content: raw };

  const [, yamlBlock, body] = match;
  const data: FrontMatter = {};

  for (const line of yamlBlock.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const rawValue = line.slice(colonIdx + 1).trim();

    data[key] =
      rawValue.startsWith("[") && rawValue.endsWith("]")
        ? splitList(rawValue.slice(1, -1))
        : rawValue;
  }

  // `tags` may span several lines, which the line-by-line pass above truncates.
  const tagsMatch = yamlBlock.match(/tags:\s*\[([\s\S]*?)\]/);
  if (tagsMatch) data.tags = splitList(tagsMatch[1]);

  return { data, content: body.trim() };
}

function splitList(value: string): string[] {
  return value
    .split("\n")
    .join("")
    .split(",")
    .map((s) => s.trim().replace(/^['"]|['"]$/g, ""))
    .filter(Boolean);
}

export function str(value: string | string[] | undefined): string {
  return typeof value === "string" ? value : "";
}

export function list(value: string | string[] | undefined): string[] {
  return Array.isArray(value) ? value : [];
}
