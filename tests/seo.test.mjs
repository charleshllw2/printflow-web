import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, access } from 'node:fs/promises';
const origin = 'https://www.printflowstudio.com';
const sitemap = await readFile('dist/sitemap.xml', 'utf8');
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
const titles = new Set(), descriptions = new Set(), incoming = new Set();
for (const url of urls) test(url, async () => {
  const path = new URL(url).pathname;
  const html = await readFile(path === '/' ? 'dist/index.html' : `dist${path}.html`, 'utf8');
  assert.equal((html.match(/<h1[ >]/g) || []).length, 1, 'one H1 in initial HTML');
  assert.equal((html.match(/<title[ >]/g) || []).length, 1, 'one title');
  assert.equal((html.match(/rel="canonical"/g) || []).length, 1, 'one canonical');
  assert.match(html, new RegExp(`rel="canonical" href="${url.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}"`));
  assert.doesNotMatch(html, /noindex|nofollow|ADMIN TODO/);
  const title = html.match(/<title[^>]*>(.*?)<\/title>/s)?.[1];
  const description = html.match(/name="description" content="([^"]+)"/)?.[1];
  assert.ok(title); assert.ok(description);
  assert.ok(!titles.has(title), `duplicate title ${title}`); titles.add(title);
  assert.ok(!descriptions.has(description), `duplicate description ${description}`); descriptions.add(description);
  const schemas = [...html.matchAll(/<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map(m => JSON.parse(m[1]));
  assert.equal(schemas.length,1);
  const graph=schemas[0]['@graph'];
  assert.ok(graph.some(e=>e['@id']===origin+'/#organization'));
  assert.ok(!graph.some(e=>e.aggregateRating||e.review||e.geo||e.address));
  if(path!=='/')assert.ok(graph.some(e=>e['@type']==='BreadcrumbList'));
  if(path.startsWith('/shop/')){const product=graph.find(e=>e['@type']==='Product');assert.ok(product);assert.equal(product.offers.price,'27.99');assert.ok(!product.offers.availability);}
  for(const [,href] of html.matchAll(/<a[^>]*href="([^"]+)"/g)){
    const linked=new URL(href.replaceAll('&amp;','&'),url);
    if(linked.origin!==origin)continue;
    assert.ok(urls.includes(origin+linked.pathname),`broken internal link ${linked.pathname}`);
    if(linked.pathname!==path)incoming.add(linked.pathname);
  }
  for(const [,tag] of html.matchAll(/(<img\s[^>]*>)/g)){
    assert.match(tag,/alt="[^"]*"/);
    const src=tag.match(/src="([^"]+)"/)?.[1];
    if(src?.startsWith('/'))await access('public'+src);
  }
});
test('error pages excluded and sitemap URLs unique',async()=>{
 assert.equal(new Set(urls).size,urls.length);assert.equal(urls.length,33);
 assert.ok(urls.every(u=>u.startsWith(origin)&&!u.includes('?')&&!/admin|login|404|api/.test(u)));
 assert.match(await readFile('dist/404.html','utf8'),/noindex/);
 assert.match(await readFile('dist/app-shell.html','utf8'),/noindex/);
});
test('important public pages have incoming links',()=>{
 for(const url of urls){const path=new URL(url).pathname;assert.ok(incoming.has(path),`orphan: ${path}`);}
});
