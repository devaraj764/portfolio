# Portfolio — devarajumaddhu.dev

Next.js 16 (App Router, TypeScript) portfolio deployed to Cloudflare Workers via
[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare).

## Stack

| Layer      | Choice |
|------------|--------|
| Framework  | Next.js 16 (App Router, React 19, Turbopack) |
| Language   | TypeScript |
| Content    | Markdown in `content/`, embedded at build time |
| Animation  | framer-motion |
| Hosting    | Cloudflare Workers (`wrangler`) |

## Layout

```
app/          Routes, metadata, sitemap.ts, robots.ts
components/   Shared UI ("use client" only where interactivity is needed)
content/      Markdown source for projects and blog posts
lib/          Content loading, resume/experience data, site config
lib/generated/ Build artifact — markdown embedded as a TS module (gitignored)
styles/       Global CSS
```

## Commands

```bash
npm run dev        # Next dev server
npm run build      # Generate content module + next build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
npm run preview    # Build the Worker and serve it locally via wrangler
npm run deploy     # Build the Worker and deploy to Cloudflare
npm run cf-typegen # Regenerate cloudflare-env.d.ts from wrangler.jsonc
```

## Adding content

Drop a `.md` file into `content/projects/` or `content/blog/`. The filename is
the URL slug. Front matter is a flat `key: value` block; `tags` accepts a
`[a, b, c]` list. Routes, `generateStaticParams`, and `sitemap.xml` pick it up
on the next build — no route or sitemap edits needed.

## Deploying

```bash
npx wrangler login   # once
npm run deploy
```

`npm run deploy` runs `opennextjs-cloudflare build` (which invokes
`npm run build`) and then `opennextjs-cloudflare deploy`. The deploy step also
copies the prerendered pages into `.open-next/assets/cdn-cgi/_next_cache/`,
which is where the Worker reads them from at request time.

## Two constraints worth knowing

**No filesystem at runtime.** Cloudflare Workers has no `fs`; `node:fs` resolves
to stubs that throw. `scripts/generate-content.mjs` therefore reads
`content/**/*.md` at build time and emits `lib/generated/content-files.ts`, so
the app graph never touches the filesystem. Read markdown through
`lib/content.ts` — never with `fs` directly.

**Prerendered-only cache.** `open-next.config.ts` uses
`staticAssetsIncrementalCache`, which is read-only: every route is prerendered
at build time and nothing revalidates. If ISR or on-demand revalidation is ever
needed, switch to `r2IncrementalCache` and provision an R2 bucket.
