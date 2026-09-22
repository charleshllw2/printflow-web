const fs = require('fs');

const path = 'src/data/shopProducts.ts';
let content = fs.readFileSync(path, 'utf8');

// We need to add slug to each object.
// A simple way is to parse the file, but since it's a TS file with `export const SHOP_PRODUCTS = [...]`,
// we can use regex to inject slug right after `id: "...",`

content = content.replace(/name: "(.*?)",/g, (match, name) => {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  return `name: "${name}",\n    slug: "${slug}",`;
});

fs.writeFileSync(path, content);
console.log("Slugs added to shopProducts.ts");
