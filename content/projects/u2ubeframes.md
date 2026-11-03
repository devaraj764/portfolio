---
order: 1
title: u2ube Frames — AI Video Studio for Explainers, Lessons & Tutorials
company: Personal Project
duration: Ongoing
tags: [Next.js 16, React 19, TypeScript, Remotion, Tailwind CSS, Neon Postgres, Drizzle ORM, Neon Auth, Cloudflare R2, OpenRouter, Fly.io, Google Cloud Run, Docker, ffmpeg, Headless Chrome, Telegram Bot API, Dodo Payments]
excerpt: An AI video studio where an agentic "director" writes real Remotion animation code for every video — from a script or just an idea — with AI narration, generated illustrations, self-review in headless Chrome, chat-based scene editing with undo/redo, and on-demand MP4 rendering on per-user cloud machines.
visit_link: https://u2ubeframes.com
---

An AI video studio for explainers, lessons and tutorials. Give it a script or an idea, pick a video type, a look and a colour palette, review the voices and pictures, and an AI director writes the Remotion animation from scratch. Render the result to MP4 when it's ready.

> **"Real animation, not templates."** Frames writes custom animation code for every video, then checks its own layout before it finishes.

- **Live**: [u2ubeframes.com](https://u2ubeframes.com)

![Whiteboard cartoon look — a frame made by Frames](/assets/u2ubeframes/look-whiteboard-cartoon.webp)

---

## How a Video Gets Made

1. **Script** — Paste a script, or start from an idea. A Create-video chat reads the sources you add (links, files, pictures), asks what's missing, and only then writes a scene-by-scene markdown script (`## scene`, a `> Show:` line for the visuals, then the narration).
2. **Voices** — The worker suggests a voice and splits the script into scenes. Narration is recorded with TTS one line at a time and joined into a single track, so every line's start time is exact. Only scenes whose words changed get re-recorded.
3. **Theme** — Pick a look (or "Auto AI"), a 3-colour palette `[bg, fg, accent]`, a font and a format (16:9, 9:16 or 1:1).
4. **Make the video** — The AI director gets the recorded lines, the storyboard and reference frames of the look, draws the pictures it needs, and writes its own Remotion code.
5. **Edit & render** — The finished video opens in a studio with a live Remotion Player. Changes are asked for in chat; nothing is rendered until you press Render and pick a speed.

---

## The Free-Form AI Director

There is no clip library. The director is an agent with tools, writing a fresh Remotion composition for every video:

| Tool | What it does |
| --- | --- |
| `create_asset` | Draws transparent illustrations (Recraft via OpenRouter on a flat magenta page, keyed out in code — no background-removal model). The director sees each picture and redraws bad ones. |
| `find_image` | Pulls a real photo or diagram from Wikimedia Commons for things AI draws badly, with the licence saved to `credits.json`. |
| `review` | Static checks plus a headless-Chrome play of every scene that measures layout: text cut off, spilling out of its box, covered or crossed by a line, too small, or near-empty frames. |
| `look` | Renders three frames per shot (arriving, settled, leaving), tiles them into one image and looks at the result before finishing. |

Each look ships with a written guide (how text is written on, how lines are drawn, transitions, what to avoid) and 8 reference frames that the director copies the *style* of — never the content.

![Blueprint diagram look](/assets/u2ubeframes/look-blueprint-diagram.webp)

### Looks

Whiteboard cartoon, Clean editorial, Kids illustrated, School notebook, Chalkboard classroom, Paper cutout story, Blueprint diagram, Data and steps, Documentary explainer and more — plus premium 2D looks (Brand promo, Kinetic type ad, Product UI demo, Cinematic trailer) reserved for the top-tier director model. Every colour on screen comes from the chosen palette.

![Paper cutout story look](/assets/u2ubeframes/look-paper-cutout-story.webp)

---

## Chat-Driven Studio Editing

- **Scene-aware requests** — Point at any part of the video however you like: `@scene2`, "the last scene", "at 1:10", a quoted line, or "here" (the playhead). Each mention is resolved to that scene's frames, storyboard row, narration lines and the exact component and line range in the code.
- **Timing as data** — Cuts, length and each line's frames live in a generated `timing.ts`. Code places shots with `<Sequence {...scene(n)}>` and lands builds with `at('l3', n)`, so moving a cut changes data, not code.
- **Editor tools** — `move_cut`, `timeline`, `fix_timeline` (snap mid-word cuts to pauses), `replace_everywhere`, `set_lines` + `record_voice` for narration changes, and asset redraws.
- **Targeted re-checks** — A scene dependency graph (top-level symbols, imports and their closure per sequence) limits the headless-Chrome review to only the scenes an edit can affect.
- **Versioning** — Every director run saves a version for undo/redo; the studio shows a history timeline and a plain-words log of what the worker is doing.

![Chalkboard classroom look](/assets/u2ubeframes/look-chalkboard-classroom.webp)

---

## Make a Video from Your Phone

A **Telegram bot** turns a topic into a finished video: `/make` asks the topic, length and notes, then researches it, writes the script, makes the video and sends back the link. A **Video ideas** page runs a web search per channel topic and proposes explainer ideas with the articles they build on (dead links are checked and dropped, so no made-up sources are saved) — one click starts a video from any idea.

---

## Technical Architecture

```
┌──────────────────────────────┐      ┌──────────────────────────────┐      ┌──────────────────────────────┐
│  Next.js 16 App (Cloud Run)  │─────▶│  Neon Postgres (Drizzle)     │      │  Cloudflare R2               │
│  Studio · Remotion Player    │      │  jobs queue · usage · plans  │      │  code · assets · bundles     │
│  Neon Auth · Dodo Payments   │      └──────────────┬───────────────┘      └──────────────▲───────────────┘
└──────────────┬───────────────┘                     │                                     │
               │ enqueue job + wake (SIGUSR1)        │ claim job                           │ sync files
               ▼                                     ▼                                     │
┌──────────────────────────────────────────────────────────────────────────────────────────┴───────────────┐
│  Per-user workers — Fly.io Machines (make & render) · Fly Sprites (edits, voices, pictures)              │
│  worker/freeform.mjs: AI director · TTS · picture generation · headless-Chrome review · ffmpeg · render   │
└──────────────────────────────────────────────┬───────────────────────────────────────────────────────────┘
                                               ▼
                                  OpenRouter (director LLMs, TTS, Recraft)
```

- **Stateless app** — Project files live in R2; local folders are only a cache swept when idle. The studio opens from a saved view and a prebuilt preview bundle, so it never needs the worker running.
- **Job queue** — The app never runs the worker itself: it syncs to R2 and adds a row to a Postgres `jobs` table (one active job per project). Each user gets their own machine, started on demand and stopped after 90 idle seconds; a busy machine never blocks a new job (up to 4 per user).
- **Rendering** — MP4 renders run on the user's machine at 2x–16x speed (that many CPUs), with the estimated time shown before you start.
- **Model catalogue** — Every model lives in the database with OpenRouter prices and limits synced by script; users choose looks, never models — each look sets the best director for it across Standard, Plus and Premium tiers.
- **Usage & billing** — Every paid call (scripting, voices, pictures, direction, edits, renders) is saved with its real cost against the project, so each video shows what it cost. Plans and credits are managed through Dodo Payments checkout and webhooks.

![Data and steps look](/assets/u2ubeframes/look-data-steps.webp)

### Technology Stack Overview

| Component | Technology |
| --- | --- |
| **Web App** | Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS, Base UI, Lucide |
| **Video Engine** | Remotion 4 (Player, renderer, transitions, captions, Lottie, Google Fonts), ffmpeg |
| **AI** | OpenRouter — director LLMs (Claude, GPT, Gemini tiers), TTS voices, Recraft image generation, vision captions |
| **Quality Checks** | Headless Chrome layout and play checks, rendered-frame contact sheets |
| **Database & Auth** | Neon Postgres, Drizzle ORM, plain-SQL migrations, Neon Auth (email/password, Google, email codes) |
| **Storage** | Cloudflare R2 (S3 API) |
| **Compute** | Google Cloud Run (app), Fly.io Machines & Sprites (per-user workers), Docker |
| **Integrations** | Telegram Bot API, Wikimedia Commons, Dodo Payments, Nodemailer |

---

Illustrated, animated explainers only — no face generation, talking avatars or voice imitation of other people.
