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
content/      Markdown source for projects
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

Drop a `.md` file into `content/projects/`. The filename is
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
`staticAssetsIncrementalCache`, which is read-only: content pages are prerendered
at build time and do not revalidate. The contact POST endpoint runs dynamically
and does not use the incremental cache. If ISR or on-demand revalidation is ever
needed, switch to `r2IncrementalCache` and provision an R2 bucket.

## Contact form email

The contact form sends messages to the inbox in `lib/site.ts` using Nodemailer.
Copy the keys from `.env.example` into `.env.local`, then set your provider's
`SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, and `SMTP_FROM` values.
Purelymail is configured with `smtp.purelymail.com:465` (implicit TLS),
using `contact@devaraju.dev` as the sender and SMTP username. Add `SMTP_PASS`
privately in `.env.local` and as a Cloudflare runtime secret. If two-factor
authentication is enabled, use a Purelymail app password.
Use port 465 for implicit TLS or 587 for required STARTTLS. `SMTP_FROM` must be
a plain email address authorized by your provider. The visitor's email is used
as `Reply-To`, so replying in your inbox reaches the visitor.

For Cloudflare, configure the same keys as **runtime** variables/secrets on the
`portfolio` Worker. Keep `SMTP_PASS` and other credentials private; never use
`NEXT_PUBLIC_` names for them. Local `.env.local` values do not configure the
production Worker. Without valid SMTP settings, the form reports temporary
unavailability and does not claim a message was sent.

The endpoint accepts only same-origin JSON submissions, limits body and field
sizes, and includes a honeypot and a Cloudflare rate limiter (three requests per
minute per IP). Keep `CONTACT_RATE_LIMITER` in `wrangler.jsonc`; the handler fails
closed if it is unavailable. Run `npm run cf-typegen` after binding changes.

Run `npm run test:contact` to check validation, bounded request
parsing, SMTP settings, and generated mail without sending real messages.
