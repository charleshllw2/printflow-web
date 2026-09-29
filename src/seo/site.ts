import { SHOP_PRODUCTS } from '../data/shopProducts';
import { BLOG_POSTS } from '../data/blogPosts';
export const SITE_URL = 'https://www.printflowstudio.com';
export const pageNames: Record<string, string> = {
  '/': 'Home', '/services': 'Services', '/custom-t-shirts-chattanooga': 'Custom Shirts',
  '/business-shirts-chattanooga': 'Business Apparel', '/dtf-transfers-chattanooga': 'DTF Transfers',
  '/church-shirts-chattanooga': 'Church Shirts', '/team-shirts-chattanooga': 'Team Shirts',
  '/event-shirts-chattanooga': 'Event Shirts', '/custom-shirts-no-minimum-chattanooga': 'Single Custom Shirts',
  '/custom-apparel-chattanooga': 'Custom Apparel', '/our-work': 'Our Work', '/faq': 'FAQ',
  '/request-quote': 'Request a Quote', '/shop': 'Shop', '/dtf-transfers': 'Ready-to-Press Transfers',
  '/file-guidelines': 'File Guidelines', '/blog': 'Printing Guides', '/privacy-policy': 'Privacy Policy',
  '/terms': 'Terms', '/shipping-pickup': 'Shipping & Pickup', '/returns': 'Returns', '/artwork-policy': 'Artwork Policy',
};
export const publicPaths = [...Object.keys(pageNames), ...SHOP_PRODUCTS.map(p => `/shop/${p.slug}`), ...BLOG_POSTS.map(p => `/blog/${p.id}`)];
export const business = {
  '@type': ['Organization', 'LocalBusiness'], '@id': `${SITE_URL}/#organization`,
  name: 'PrintFlow Studio', url: `${SITE_URL}/`, logo: `${SITE_URL}/logo.png`,
  description: 'Custom shirt printing and DTF transfers in Chattanooga, Tennessee.',
  telephone: '+1-423-681-2218', email: 'hello@printflowstudio.com',
  areaServed: { '@type': 'City', name: 'Chattanooga', containedInPlace: { '@type': 'State', name: 'Tennessee' } },
};
export function structuredData(path: string, title: string, schema?: string) {
  const product = SHOP_PRODUCTS.find(p => path === `/shop/${p.slug}`);
  const post = BLOG_POSTS.find(p => path === `/blog/${p.id}`);
  const graph: object[] = [business, { '@type': 'WebSite', '@id': `${SITE_URL}/#website`, url: `${SITE_URL}/`, name: 'PrintFlow Studio', publisher: { '@id': business['@id'] } }];
  if (path !== '/' && publicPaths.includes(path)) {
    const crumbs = [{ name: 'Home', item: `${SITE_URL}/` }];
    if (product) crumbs.push({ name: 'Shop', item: `${SITE_URL}/shop` });
    if (post) crumbs.push({ name: 'Printing Guides', item: `${SITE_URL}/blog` });
    crumbs.push({ name: product?.name || post?.title || pageNames[path] || title, item: SITE_URL + path });
    graph.push({ '@type': 'BreadcrumbList', itemListElement: crumbs.map((crumb, i) => ({ '@type': 'ListItem', position: i + 1, ...crumb })) });
  }
  if (product) graph.push({
    '@type': 'Product', '@id': `${SITE_URL}${path}#product`, name: product.name, sku: product.id,
    url: SITE_URL + path, image: [SITE_URL + product.mockup, SITE_URL + product.artwork],
    description: 'Original PrintFlow Studio design, printed in vibrant full color on a premium standard tee. Made to order.',
    brand: { '@type': 'Brand', name: 'PrintFlow Studio' },
    offers: { '@type': 'Offer', url: SITE_URL + path, price: product.price.toFixed(2), priceCurrency: 'USD', seller: { '@id': business['@id'] } },
  });
  // Availability is deliberately omitted: the catalog has no verified stock field.
  if (schema) {
    const parsed = JSON.parse(schema);
    const entities = parsed['@graph'] || [parsed];
    for (const entity of entities) {
      const { '@context': _context, ...value } = entity;
      if (value['@type'] === 'Service') value.provider = { '@id': business['@id'] };
      graph.push(value);
    }
  }
  return JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
}
