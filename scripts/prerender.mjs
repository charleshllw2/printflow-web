import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { dirname } from 'node:path';
import { render, publicPaths } from '../.seo-build/entry-server.js';
const transferCss = (await readdir('dist/assets')).find(name => /^Shop-.*\.css$/.test(name));
const original = await readFile('dist/index.html', 'utf8');
const template = original.replace(/<title>[\s\S]*?<\/title>/, '');
const token = (process.env.GOOGLE_SITE_VERIFICATION || '').trim();
if (token && !/^[\w-]+$/.test(token)) throw new Error('GOOGLE_SITE_VERIFICATION must contain only the Google token, not an HTML tag.');
const ga = (process.env.GA4_MEASUREMENT_ID ?? 'G-MW2N70WBQ4').trim();
if (ga && !/^G-[A-Z0-9]+$/.test(ga)) throw new Error('GA4_MEASUREMENT_ID must be a G- measurement ID.');
const verification = token ? `<meta name="google-site-verification" content="${token}">` : '';
const analytics = ga ? `<script async src="https://www.googletagmanager.com/gtag/js?id=${ga}"></script><script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('js',new Date());gtag('config','${ga}');</script>` : '';
// Fail if a new static public route has not been considered for the sitemap.
const app = await readFile('src/App.tsx', 'utf8');
for (const [, route] of app.matchAll(/<Route path="([^"]+)"/g)) {
  if (!route.includes(':') && route !== '*' && !['/admin','/login','/business-apparel-chattanooga','/custom-tshirts-chattanooga'].includes(route) && !publicPaths.includes(route)) throw new Error(`Add public route to SEO registry: ${route}`);
}
await writeFile('dist/app-shell.html', template.replace('</head>', '<meta data-prerender="true" name="robots" content="noindex,follow"></head>'));
for (const path of [...publicPaths, '/404']) {
  const { body, head } = await render(path);
  const html = template.replace('</head>', `${head}${path === "/dtf-transfers" && transferCss ? `<link rel="stylesheet" href="/assets/${transferCss}">` : ""}${verification}${path === '/404' ? '' : analytics}</head>`).replace('<div id="root"></div>', `<div id="root">${body}</div>`);
  if (!/<h1[ >]/.test(html)) throw new Error(`Missing H1: ${path}`);
  const file = path === '/' ? 'dist/index.html' : `dist${path}.html`;
  await mkdir(dirname(file), { recursive: true }); await writeFile(file, html);
}
const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${publicPaths.map(path => `  <url><loc>https://www.printflowstudio.com${path}</loc></url>`).join('\n')}\n</urlset>\n`;
await writeFile('dist/sitemap.xml', xml);
console.log(`Prerendered ${publicPaths.length} public pages; sitemap generated from current routes and products.`);
