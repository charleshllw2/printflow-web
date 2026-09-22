const fs = require('fs');

const shopPath = 'src/pages/ShopPage.tsx';
let shopContent = fs.readFileSync(shopPath, 'utf8');

// 1. Remove @ts-nocheck
shopContent = shopContent.replace('// @ts-nocheck\n', '');

// 2. Add Types
const types = `
interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  mockup: string;
  artwork: string;
}

interface ProductCardProps {
  product: Product;
}
`;
shopContent = shopContent.replace('import "./shop.css";', 'import "./shop.css";\n' + types);

// 3. Fix ProductCard signature
shopContent = shopContent.replace('function ProductCard({ product }) {', 'function ProductCard({ product }: ProductCardProps) {');

// 4. Update SEO tags & Schema
shopContent = shopContent.replace(/<SEO[\s\S]*?\/>/, `<SEO 
        title="Shop Custom T-Shirts & Apparel | PrintFlow Studio"
        description="Shop original PrintFlow Studio apparel and designs. Quality DTF printing, fast Chattanooga pickup, and nationwide shipping. Buy online today!"
        canonicalUrl="https://www.printflowstudio.com/shop"
        schema={JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": "https://www.printflowstudio.com/shop",
              "name": "Shop Custom T-Shirts & Apparel | PrintFlow Studio",
              "description": "Shop original PrintFlow Studio apparel and designs. Quality DTF printing, fast Chattanooga pickup, and nationwide shipping. Buy online today!",
              "url": "https://www.printflowstudio.com/shop"
            },
            {
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Home",
                  "item": "https://www.printflowstudio.com/"
                },
                {
                  "@type": "ListItem",
                  "position": 2,
                  "name": "Shop",
                  "item": "https://www.printflowstudio.com/shop"
                }
              ]
            },
            ...SHOP_PRODUCTS.map(p => ({
              "@type": "Product",
              "name": p.name,
              "image": "https://www.printflowstudio.com" + p.mockup,
              "description": "Original design by PrintFlow Studio. Available as a standard tee or custom DTF transfer.",
              "sku": p.id,
              "offers": {
                "@type": "Offer",
                "url": "https://www.printflowstudio.com/shop",
                "priceCurrency": "USD",
                "price": p.price.toFixed(2),
                "availability": "https://schema.org/InStock"
              }
            }))
          ]
        })}
      />`);

// 5. Add Reassurance & Custom Path
const introRegex = /<section className="shop-intro">[\s\S]*?<\/section>/;
const newIntro = `<section className="shop-intro">
          <p className="shop-eyebrow">PRINTFLOW STUDIO DESIGN SHOP</p>
          <h1>Pick a design. Make it yours.</h1>
          <p className="shop-reassurance" style={{ marginTop: '5px', marginBottom: '15px' }}><strong>Original designs • Quality DTF printing • Chattanooga pickup • Nationwide shipping</strong></p>
          <p>Shop a standard tee online, or request another garment, size, color, or ready-to-press DTF transfer.</p>
          <p className="shop-custom-path" style={{ marginTop: '10px' }}>Don't see exactly what you want? <Link to="/request-quote" style={{ textDecoration: 'underline', color: 'var(--accent-color, #D000E8)', fontWeight: 'bold' }}>Request a custom design or custom shirt.</Link></p>
        </section>`;
shopContent = shopContent.replace(introRegex, newIntro);

// 6. Make Image & Title Clickable
shopContent = shopContent.replace(/<img[\s\S]*?loading="lazy"\n\s*\/>/, `<img
          src={view === "mockup" ? product.mockup : product.artwork}
          alt={view === "mockup" ? \`\${product.name} shirt mockup\` : \`\${product.name} artwork\`}
          loading="lazy"
          onClick={() => setView(view === "mockup" ? "artwork" : "mockup")}
          style={{ cursor: "pointer" }}
        />`);

shopContent = shopContent.replace('<h2>{product.name}</h2>', '<h2 onClick={() => setView(view === "mockup" ? "artwork" : "mockup")} style={{ cursor: "pointer" }}>{product.name}</h2>');

// Add "any" type for event target in select elements to satisfy typescript
shopContent = shopContent.replace(/onChange=\{\(event\) => setSize\(event\.target\.value\)\}/g, 'onChange={(event: any) => setSize(event.target.value)}');
shopContent = shopContent.replace(/onChange=\{\(event\) => setColor\(event\.target\.value\)\}/g, 'onChange={(event: any) => setColor(event.target.value)}');
shopContent = shopContent.replace(/onChange=\{\(event\) => setQuantity\(Number\(event\.target\.value\)\)\}/g, 'onChange={(event: any) => setQuantity(Number(event.target.value))}');

fs.writeFileSync(shopPath, shopContent);
console.log("Updated ShopPage.tsx successfully.");
