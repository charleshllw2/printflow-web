// Server only. Never import this module from src/.
export const money = 'amount currencyCode';
export const image = 'url altText width height';
export const variantFields = `id title availableForSale selectedOptions { name value } price { ${money} } compareAtPrice { ${money} } image { ${image} }`;
export const summaryFields = `id handle title description productType availableForSale featuredImage { ${image} } priceRange { minVariantPrice { ${money} } maxVariantPrice { ${money} } } compareAtPriceRange { minVariantPrice { ${money} } } options { name optionValues { name } }`;
export const productQuery = `query Product($handle: String!, $after: String) { product(handle: $handle) { ${summaryFields} seo { title description } images(first: 100) { nodes { ${image} } } variants(first: 250, after: $after) { nodes { ${variantFields} } pageInfo { hasNextPage endCursor } } } }`;
export const catalogQuery = `query Catalog($after: String) { products(first: 24, after: $after, sortKey: CREATED_AT, reverse: true) { nodes { ${summaryFields} } pageInfo { hasNextPage endCursor } } }`;
export const collectionQuery = `query Transfers($handle: String!, $after: String) { collection(handle: $handle) { products(first: 24, after: $after) { nodes { ${summaryFields} } pageInfo { hasNextPage endCursor } } } }`;
export const cartFields = `id checkoutUrl totalQuantity cost { subtotalAmount { ${money} } } lines(first: 250) { nodes { id quantity cost { amountPerQuantity { ${money} } totalAmount { ${money} } } merchandise { ... on ProductVariant { ${variantFields} product { handle title } } } } }`;
export const cartQuery = `query Cart($id: ID!) { cart(id: $id) { ${cartFields} } }`;
const payload = `cart { ${cartFields} } userErrors { code field message } warnings { code }`;
export const mutations = {
  create: `mutation Create($lines: [CartLineInput!]) { cartCreate(input: {lines: $lines}) { ${payload} } }`,
  add: `mutation Add($id: ID!, $lines: [CartLineInput!]!) { cartLinesAdd(cartId: $id, lines: $lines) { ${payload} } }`,
  update: `mutation Update($id: ID!, $lines: [CartLineUpdateInput!]!) { cartLinesUpdate(cartId: $id, lines: $lines) { ${payload} } }`,
  remove: `mutation Remove($id: ID!, $lineIds: [ID!]!) { cartLinesRemove(cartId: $id, lineIds: $lineIds) { ${payload} } }`,
};
export class ShopError extends Error { constructor(message, status = 503) { super(message); this.status = status; } }
export async function shopify(query, variables = {}, request) {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN;
  if (!domain || !/^[a-z0-9][a-z0-9-]*\.myshopify\.com$/.test(domain) || !token) throw new ShopError('Our shop is temporarily unavailable. Please try again shortly.');
  const headers = { 'Content-Type': 'application/json', 'Shopify-Storefront-Private-Token': token };
  // Vercel overwrites this header; never trust an arbitrary client X-Forwarded-For.
  const ip = process.env.VERCEL ? request?.headers['x-vercel-forwarded-for']?.split(',')[0]?.trim() : request?.socket?.remoteAddress;
  if (ip) headers['Shopify-Storefront-Buyer-IP'] = ip;
  const response = await fetch(`https://${domain}/api/2026-07/graphql.json`, { method: 'POST', headers, body: JSON.stringify({ query, variables }), signal: AbortSignal.timeout(10000) });
  if (!response.ok) throw new ShopError('Our shop is temporarily unavailable. Please try again shortly.');
  const result = await response.json();
  if (result.errors || !result.data) throw new ShopError('Our shop is temporarily unavailable. Please try again shortly.');
  return result.data;
}
export function normalizeProduct(product) {
  return { ...product, options: product.options.map(o => ({ name: o.name, values: o.optionValues.map(v => v.name) })) };
}
export function validHandle(handle) { return typeof handle === 'string' && /^[a-z0-9][a-z0-9-]{0,254}$/.test(handle); }
export async function getProduct(handle, request) {
  if (!validHandle(handle)) throw new ShopError('Product not found.', 404);
  let product; let after; const variants = [];
  do {
    const data = await shopify(productQuery, { handle, after }, request);
    if (!data.product) throw new ShopError('Product not found.', 404);
    product = data.product;
    variants.push(...product.variants.nodes);
    after = product.variants.pageInfo.hasNextPage ? product.variants.pageInfo.endCursor : null;
  } while (after);
  return { ...normalizeProduct(product), variants: { nodes: variants } };
}
export function safeCheckout(url) {
  try {
    const parsed = new URL(url);
    const domain = process.env.SHOPIFY_STORE_DOMAIN;
    const custom = process.env.SHOPIFY_CHECKOUT_DOMAIN;
    return parsed.protocol === 'https:' && !parsed.username && !parsed.password && [domain, custom, 'checkout.shopify.com'].filter(Boolean).includes(parsed.hostname) ? parsed.href : null;
  } catch { return null; }
}
