import { createServer } from 'http';
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, extname } from 'path';
import puppeteer from 'puppeteer';

const DIST = join(process.cwd(), 'dist');
const PORT = 4173;

const ROUTES = [
  '/',
  '/projects',
  '/blog',
  '/experience',
  '/contact',
  '/projects/nyayasetu',
  '/projects/ai4contracts',
  '/projects/indoqatar',
  '/projects/musoclef',
  '/blog/building-ai-agents',
  '/blog/building-legal-reasoning-agent',
  '/blog/building-rag-server',
  '/blog/exploring-mcp-servers',
  '/blog/postgres-can-replace-your-backend',
];

const MIME_TYPES = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

function startServer() {
  return new Promise((resolve) => {
    const server = createServer((req, res) => {
      let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url);

      // SPA fallback: if file doesn't exist, serve index.html
      if (!existsSync(filePath) || !extname(filePath)) {
        filePath = join(DIST, 'index.html');
      }

      try {
        const content = readFileSync(filePath);
        const ext = extname(filePath);
        res.writeHead(200, { 'Content-Type': MIME_TYPES[ext] || 'application/octet-stream' });
        res.end(content);
      } catch {
        // Fallback to index.html for SPA routes
        const content = readFileSync(join(DIST, 'index.html'));
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(content);
      }
    });

    server.listen(PORT, () => {
      console.log(`Static server running on http://localhost:${PORT}`);
      resolve(server);
    });
  });
}

async function prerender() {
  console.log('Starting pre-render...');

  const server = await startServer();
  const browser = await puppeteer.launch({ headless: true, args: ['--no-sandbox'] });

  for (const route of ROUTES) {
    const url = `http://localhost:${PORT}${route}`;
    console.log(`Rendering: ${route}`);

    const page = await browser.newPage();
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });

    // Wait a bit for React and Helmet to finish
    await page.waitForSelector('#root > *', { timeout: 10000 });
    await new Promise((r) => setTimeout(r, 1000));

    const html = await page.content();
    await page.close();

    // Write to dist/<route>/index.html
    const outDir = route === '/' ? DIST : join(DIST, route);
    mkdirSync(outDir, { recursive: true });

    const outFile = route === '/' ? join(DIST, 'index.html') : join(outDir, 'index.html');
    writeFileSync(outFile, html, 'utf-8');
    console.log(`  -> ${outFile.replace(process.cwd() + '/', '')}`);
  }

  await browser.close();
  server.close();
  console.log(`\nPre-rendered ${ROUTES.length} routes successfully.`);
}

prerender().catch((err) => {
  console.error('Pre-render failed:', err);
  process.exit(1);
});
