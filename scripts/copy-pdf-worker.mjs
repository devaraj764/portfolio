/**
 * Copies the pdf.js worker out of node_modules into `public/`.
 *
 * react-pdf needs the worker at a stable URL. Resolving it through the bundler
 * (`new URL(..., import.meta.url)`) is Turbopack/webpack-specific and breaks
 * silently on the Workers build, and pointing at a CDN adds a runtime
 * dependency — a copy in the static-asset store is served reliably instead.
 */
import { cpSync, copyFileSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = join(ROOT, "public/pdfjs");
const OUT_FILE = join(OUT_DIR, "pdf.worker.min.mjs");

const worker = require.resolve("pdfjs-dist/build/pdf.worker.min.mjs");
const standardFonts = join(
  dirname(require.resolve("pdfjs-dist/package.json")),
  "standard_fonts",
);

mkdirSync(OUT_DIR, { recursive: true });
copyFileSync(worker, OUT_FILE);

// Only fetched when a PDF leaves one of the standard 14 fonts unembedded. The
// current resume embeds everything, but a replacement exported from Word or
// Google Docs may not — without these it would render in fallback glyphs.
cpSync(standardFonts, join(OUT_DIR, "standard_fonts"), { recursive: true });

console.log("Copied pdf.js worker + standard fonts -> public/pdfjs/");
