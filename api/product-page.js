import { readFile } from 'node:fs/promises';
import { getProduct, ShopError } from '../server/shopify.js';
const escape = value => String(value || '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
export function metadata(product) {
  const url = `https://www.printflowstudio.com/shop/${product.handle}`;
  const title = `${product.seo.title || product.title} | PrintFlow Studio Shop`;
  const description = product.seo.description || product.description.slice(0, 160);
  const schema = { '@context': 'https://schema.org', '@type': 'Product', name: product.title, description: product.description, image: product.images.nodes.map(i => i.url), offers: product.variants.nodes.map(v => ({ '@type': 'Offer', price: v.price.amount, priceCurrency: v.price.currencyCode, availability: `https://schema.org/${v.availableForSale ? 'InStock' : 'OutOfStock'}`, url })) };
  return `<title data-rh="true">${escape(title)}</title><meta data-rh="true" name="description" content="${escape(description)}"><link data-rh="true" rel="canonical" href="${escape(url)}"><meta data-rh="true" property="og:title" content="${escape(title)}"><meta data-rh="true" property="og:description" content="${escape(description)}"><meta data-rh="true" property="og:url" content="${escape(url)}"><meta data-rh="true" property="og:type" content="product"><meta data-rh="true" property="og:image" content="${escape(product.featuredImage?.url)}"><meta data-rh="true" property="og:image:alt" content="${escape(product.featuredImage?.altText || product.title)}"><meta data-rh="true" name="twitter:card" content="summary_large_image"><script data-rh="true" type="application/ld+json">${JSON.stringify(schema).replace(/</g, '\\u003c')}</script>`;
}
export default async function handler(request, response) {
  if (request.method !== 'GET' && request.method !== 'HEAD') return response.status(405).end();
  let html = await readFile(new URL('../dist/index.html', import.meta.url), 'utf8');
  // Replace page-specific tags while preserving global business schema and assets.
  html = html.replace(/<title>[\s\S]*?<\/title>/gi, '').replace(/<meta\s+[^>]*(?:name=["'](?:description|twitter:[^"']*)["']|property=["']og:[^"']*["'])[^>]*>/gi, '').replace(/<link\s+[^>]*rel=["']canonical["'][^>]*>/gi, '');
  let status = 200; let head;
  try { head = metadata(await getProduct(request.query.handle, request)); response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60'); }
  catch (error) { status = error instanceof ShopError ? error.status : 503; head = `<title>${status === 404 ? 'Product not found' : 'Shop temporarily unavailable'} | PrintFlow Studio</title><meta name="robots" content="noindex">`; response.setHeader('Cache-Control', 'no-store'); }
  response.setHeader('Content-Type', 'text/html; charset=utf-8');
  return response.status(status).send(html.replace('</head>', `${head}</head>`));
}
