import { shopify, getProduct, catalogQuery, collectionQuery, cartQuery, mutations, ShopError, safeCheckout, normalizeProduct } from '../server/shopify.js';
const cookieName = 'pf_shopify_cart';
function cartId(request) {
  try { return decodeURIComponent((request.headers.cookie || '').split(';').map(x => x.trim()).find(x => x.startsWith(`${cookieName}=`))?.slice(cookieName.length + 1) || ''); } catch { return ''; }
}
function cookie(response, id) {
  response.setHeader('Set-Cookie', `${cookieName}=${encodeURIComponent(id)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${id ? 864000 : 0}${process.env.NODE_ENV === 'production' || process.env.VERCEL ? '; Secure' : ''}`);
}
function publicCart(cart) { if (!cart) return null; const { id, checkoutUrl, ...safe } = cart; void id; void checkoutUrl; return safe; }
function validQuantity(q) { return Number.isInteger(q) && q >= 1 && q <= 99; }
export default async function handler(request, response) {
  response.setHeader('Cache-Control', 'private, no-store');
  response.setHeader('X-Content-Type-Options', 'nosniff');
  try {
    if (request.method === 'GET') {
      const { resource, handle, after, collection } = request.query;
      if (after && (typeof after !== 'string' || after.length > 1024)) throw new ShopError('Invalid page.', 400);
      if (resource === 'products') {
        const data = collection === 'transfers' ? await shopify(collectionQuery, { handle: process.env.SHOPIFY_TRANSFERS_COLLECTION || 'dtf-transfers', after }, request) : await shopify(catalogQuery, { after }, request);
        const products = collection === 'transfers' ? data.collection?.products || { nodes: [], pageInfo: { hasNextPage: false, endCursor: null } } : data.products;
        response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60');
        return response.status(200).json({ ...products, nodes: products.nodes.map(normalizeProduct) });
      }
      if (resource === 'product') {
        const product = await getProduct(handle, request);
        response.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60');
        return response.status(200).json(product);
      }
      if (resource === 'cart') {
        const id = cartId(request);
        const cart = id ? (await shopify(cartQuery, { id }, request)).cart : null;
        if (id && !cart) cookie(response, '');
        return response.status(200).json({ cart: publicCart(cart) });
      }
      throw new ShopError('Not found.', 404);
    }
    if (request.method !== 'POST') { response.setHeader('Allow', 'GET, POST'); throw new ShopError('Method not allowed.', 405); }
    const allowedOrigin = process.env.SITE_URL || 'https://www.printflowstudio.com';
    const origin = request.headers.origin;
    const local = !process.env.VERCEL && process.env.NODE_ENV !== 'production' && /^http:\/\/localhost:\d+$/.test(origin || '');
    if ((!local && origin !== allowedOrigin) || request.headers['sec-fetch-site'] === 'cross-site') throw new ShopError('Please refresh the page and try again.', 403);
    if (!request.headers['content-type']?.startsWith('application/json')) throw new ShopError('Invalid request.', 415);
    const body = request.body || {};
    const { action, merchandiseId, lineId, quantity } = body;
    if (!['add', 'update', 'remove', 'checkout'].includes(action)) throw new ShopError('Invalid cart action.', 400);
    if (['add', 'update'].includes(action) && !validQuantity(quantity)) throw new ShopError('Choose a quantity from 1 to 99.', 400);
    let id = cartId(request);
    let cart = id ? (await shopify(cartQuery, { id }, request)).cart : null;
    if (!cart && id) { cookie(response, ''); id = ''; }
    if (action === 'checkout') {
      if (!cart?.totalQuantity) throw new ShopError('Your cart is empty. Please add an item first.', 409);
      if (cart.lines.nodes.some(line => !line.merchandise.availableForSale)) throw new ShopError('Please remove sold-out items before checking out.', 409);
      const url = safeCheckout(cart.checkoutUrl);
      if (!url) throw new ShopError('Checkout is temporarily unavailable. Please try again.');
      return response.status(200).json({ url });
    }
    if (action !== 'add' && !cart) throw new ShopError('Your cart has expired. Please add your items again.', 409);
    if (action !== 'add' && !cart.lines.nodes.some(line => line.id === lineId)) throw new ShopError('This item is no longer in your cart. Refresh and try again.', 409);
    if (action === 'add') {
      if (typeof merchandiseId !== 'string' || !/^gid:\/\/shopify\/ProductVariant\/\d+$/.test(merchandiseId)) throw new ShopError('Please choose a product option.', 400);
      const data = await shopify('query Available($id: ID!) { node(id: $id) { ... on ProductVariant { availableForSale } } }', { id: merchandiseId }, request);
      if (!data.node?.availableForSale) throw new ShopError('This option is sold out. Please choose another.', 409);
      if (cart?.lines.nodes.length >= 100) throw new ShopError('Your cart is full. Please check out before adding more items.', 409);
    }
    if (action === 'update' && !cart.lines.nodes.find(line => line.id === lineId).merchandise.availableForSale) throw new ShopError('This option is sold out. Please remove it from your cart.', 409);
    const operation = action === 'add' && !id ? 'create' : action;
    const variables = action === 'remove' ? { id, lineIds: [lineId] } : { id, lines: [action === 'add' ? { merchandiseId, quantity } : { id: lineId, quantity }] };
    const result = await shopify(mutations[operation], variables, request);
    const payload = Object.values(result)[0];
    if (payload.userErrors?.length || !payload.cart) throw new ShopError('We could not update your cart. Check availability and quantity, then try again.', 409);
    cart = payload.cart;
    cookie(response, cart.id);
    return response.status(200).json({ cart: publicCart(cart), warning: payload.warnings?.length ? 'Shopify adjusted your cart for current availability. Please review the items and quantities.' : '' });
  } catch (error) {
    return response.status(error instanceof ShopError ? error.status : 503).json({ error: error instanceof ShopError ? error.message : 'Our shop is temporarily unavailable. Please try again shortly.' });
  }
}
