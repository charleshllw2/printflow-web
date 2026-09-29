// Test-only upstream simulator, never imported by production or normal dev.
process.env.SHOPIFY_STORE_DOMAIN = 'theprintflowstudio.myshopify.com';
process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN = 'test-only';
process.env.PORT = '4179';
const money = amount => ({ amount: amount.toFixed(2), currencyCode: 'USD' });
const photo = { url: 'http://localhost:4179/shop/7bbb19ac89c8587f68dbd3b70e5f680106d86c03.jpg', altText: 'Test tee front', width: 800, height: 1000 };
const variants = [ ['S', 'Black', true], ['M', 'Black', true], ['S', 'White', false], ['M', 'White', true] ].map(([size, color, availableForSale], i) => ({ id: `gid://shopify/ProductVariant/${i + 1}`, title: `${size} / ${color}`, availableForSale, selectedOptions: [{ name: 'Size', value: size }, { name: 'Color', value: color }], price: money(27.99 + i), compareAtPrice: money(35), image: photo }));
const product = { id: 'gid://shopify/Product/1', handle: 'test-tee', title: 'Test PrintFlow Tee', description: 'A comfortable printed tee.\nMade by PrintFlow Studio.', productType: 'Apparel', availableForSale: true, featuredImage: photo, images: { nodes: [photo, { ...photo, url: 'http://localhost:4179/shop/d699f89ee93e2371b8d2d493972c65a93d936195.jpg', altText: 'Test tee artwork' }] }, options: [{ name: 'Size', optionValues: [{ name: 'S' }, { name: 'M' }] }, { name: 'Color', optionValues: [{ name: 'Black' }, { name: 'White' }] }], priceRange: { minVariantPrice: money(27.99), maxVariantPrice: money(30.99) }, compareAtPriceRange: { minVariantPrice: money(35) }, seo: {}, variants: { nodes: variants, pageInfo: { hasNextPage: false } } };
const single = { ...product, id: 'gid://shopify/Product/2', handle: 'single', title: 'Single Variant Product', featuredImage: null, images: { nodes: [] }, options: [{ name: 'Title', optionValues: [{ name: 'Default Title' }] }], variants: { nodes: [{ ...variants[0], id: 'gid://shopify/ProductVariant/5', title: 'Default Title', image: null, selectedOptions: [{ name: 'Title', value: 'Default Title' }] }], pageInfo: { hasNextPage: false } } };
const soldout = { ...product, id: 'gid://shopify/Product/3', handle: 'soldout', title: 'Sold Out Product', availableForSale: false, variants: { nodes: variants.map(v => ({ ...v, availableForSale: false })), pageInfo: { hasNextPage: false } } };
const products = [product, single, soldout];
const carts = new Map();
let serial = 0;
const nativeFetch = global.fetch;
global.fetch = async (url, options) => {
  if (!String(url).startsWith('https://theprintflowstudio.myshopify.com/api/')) return nativeFetch(url, options);
  const { query, variables: v } = JSON.parse(options.body);
  let data;
  if (query.startsWith('query Catalog')) data = { products: { nodes: products, pageInfo: { hasNextPage: false } } };
  else if (query.startsWith('query Transfers')) data = { collection: { products: { nodes: products.slice(0, 1), pageInfo: { hasNextPage: false } } } };
  else if (query.startsWith('query Product')) data = { product: products.find(p => p.handle === v.handle) || null };
  else if (query.startsWith('query Available')) data = { node: [...variants, ...single.variants.nodes].find(x => x.id === v.id) || null };
  else if (query.startsWith('query Cart')) data = { cart: carts.get(v.id) || null };
  else {
    const cart = query.startsWith('mutation Create') ? { id: `gid://shopify/Cart/test-${++serial}?key=private-key`, checkoutUrl: 'https://theprintflowstudio.myshopify.com/checkouts/test', lines: { nodes: [] } } : carts.get(v.id);
    if (!cart) throw new Error('Missing test cart');
    if (query.startsWith('mutation Remove')) cart.lines.nodes = cart.lines.nodes.filter(l => !v.lineIds.includes(l.id));
    else for (const input of v.lines) {
      if (query.startsWith('mutation Update')) cart.lines.nodes.find(l => l.id === input.id).quantity = input.quantity;
      else { const existing = cart.lines.nodes.find(l => l.merchandise.id === input.merchandiseId); if (existing) existing.quantity += input.quantity; else { const source = products.find(p => p.variants.nodes.some(x => x.id === input.merchandiseId)); const merchandise = source.variants.nodes.find(x => x.id === input.merchandiseId); cart.lines.nodes.push({ id: `line-${serial}-${input.merchandiseId}`, quantity: input.quantity, merchandise: { ...merchandise, product: { title: source.title, handle: source.handle } } }); } }
    }
    cart.totalQuantity = cart.lines.nodes.reduce((sum, l) => sum + l.quantity, 0);
    cart.lines.nodes.forEach(l => { l.cost = { amountPerQuantity: l.merchandise.price, totalAmount: money(Number(l.merchandise.price.amount) * l.quantity) }; });
    cart.cost = { subtotalAmount: money(cart.lines.nodes.reduce((sum, l) => sum + Number(l.cost.totalAmount.amount), 0)) };
    carts.set(cart.id, cart);
    data = { result: { cart, userErrors: [], warnings: [] } };
  }
  return new Response(JSON.stringify({ data }), { status: 200 });
};
