import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build, createServer, preview } from 'vite';
import puppeteer from 'puppeteer-core';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const SITE_URL = 'https://manik0107.me';

function findChrome() {
  const candidates = [
    process.env.CHROME_PATH,
    process.env.CHROME_BIN,
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
    '/Applications/Chromium.app/Contents/MacOS/Chromium',
    '/usr/bin/google-chrome',
    '/usr/bin/google-chrome-stable',
    '/usr/bin/chromium',
    '/usr/bin/chromium-browser',
  ].filter(Boolean);
  return candidates.find((c) => existsSync(c)) || null;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function writeSitemap(projects) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const urls = [
    { loc: `${SITE_URL}/`, priority: '1.0', changefreq: 'monthly' },
    { loc: `${SITE_URL}/resume`, priority: '0.8', changefreq: 'monthly' },
    ...projects.map((p) => ({
      loc: `${SITE_URL}/project/${p.slug}`,
      priority: '0.9',
      changefreq: 'monthly',
    })),
  ];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`
  )
  .join('\n')}
</urlset>
`;
  return xml;
}

const chromePath = findChrome();

if (!chromePath) {
  console.warn(
    '[prerender] No Chrome/Chromium found. Skipping prerender (raw SPA HTML will be deployed).'
  );
  process.exit(0);
}

console.log('[prerender] Loading project routes...');
const loader = await createServer({ root, server: { middlewareMode: true }, appType: 'custom' });
const { projects } = await loader.ssrLoadModule('/src/data/projects.ts');
await loader.close();

const routes = ['/', '/resume', ...projects.map((p) => `/project/${p.slug}`)];

console.log('[prerender] Building production bundle...');
await build({ root });

console.log('[prerender] Starting preview server...');
const previewServer = await preview({
  root,
  preview: { host: '127.0.0.1', port: 4174 },
});
const { port } = previewServer.httpServer.address();
const baseUrl = `http://127.0.0.1:${port}`;

const browser = await puppeteer.launch({
  executablePath: chromePath,
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--enable-unsafe-swiftshader',
  ],
});

const snapshots = new Map();

try {
  for (const route of routes) {
    const page = await browser.newPage();
    await page.setViewport({ width: 1440, height: 900 });
    try {
      await page.goto(baseUrl + route, { waitUntil: 'networkidle2', timeout: 90000 });
      await sleep(1500);
      snapshots.set(route, await page.content());
      console.log(`[prerender] Snapshot OK: ${route}`);
    } catch (err) {
      console.error(`[prerender] Failed to snapshot ${route}: ${err.message}`);
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
  await previewServer.httpServer.close();
}

for (const [route, html] of snapshots) {
  const outPath =
    route === '/'
      ? path.join(dist, 'index.html')
      : path.join(dist, ...route.split('/').filter(Boolean), 'index.html');
  await mkdir(path.dirname(outPath), { recursive: true });
  await writeFile(outPath, html);
  console.log(`[prerender] Wrote ${path.relative(root, outPath)} (${(html.length / 1024).toFixed(1)} KB)`);
}

await writeFile(path.join(dist, 'sitemap.xml'), writeSitemap(projects));
console.log('[prerender] Wrote sitemap.xml');
