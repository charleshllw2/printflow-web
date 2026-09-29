# Shopify integration audit — September 27, 2026

## Existing project findings

Actual website: `/Users/charlesholloway/Documents/Development/printflow-web` (clean Git working tree before implementation). The task's initial `Documents/New project` contains unrelated PrintFlow tools; those were not modified.

| Area | Before implementation |
| --- | --- |
| Framework | React 19, TypeScript, Vite, React Router, react-helmet-async |
| Deployment | Vercel; live HTTP headers and local vercel.json agree |
| Shop | src/pages/ShopPage.tsx, route /shop in src/App.tsx |
| Product cards | Inline ProductCard in ShopPage.tsx; existing shop.css |
| Product detail | ShopProductPage.tsx at /shop/:slug; fixed sizes/colors |
| Apparel source | Eight hard-coded records in src/data/shopProducts.ts |
| Cart | None; Buy Now opened a Stripe Checkout session |
| Checkout | api/create-shop-checkout.js duplicated titles and a fixed price |
| Transfers | Shop.tsx at /dtf-transfers; static data/products.ts and simulated add-to-cart |
| Other backend | Firebase custom quote uploads and admin; retained |
| Environment | Existing ignored .env.local; server process.env for Stripe/SITE_URL |
| Shopify | No package or integration existed |
| Baseline | Build passed with ~752 KB main JS; lint failed with 13 errors |

## Created files

- `.env.example`: server configuration template.
- `server/shopify.js`: pinned Storefront queries, client, validation, pagination, checkout allowlist.
- `api/commerce.js`: catalog/product reads and cookie-backed cart operations.
- `api/product-page.js`: initial product HTML metadata and HTTP statuses.
- `src/lib/commerce.ts`: client API/types and image/money helpers.
- `src/components/ShopUI.tsx`: existing-style product image, price, and state controls.
- `src/pages/ShopCart.tsx`: cart page.
- `scripts/dev.mjs`: Vite plus local API development server.
- `playwright.config.ts`, `tests/commerce.test.mjs`, `tests/mock-shopify.mjs`, `tests/browser/shop.spec.ts`: verification tooling and test-only upstream simulator.
- `SHOPIFY_SETUP.md`, `SHOPIFY_AUDIT.md`: setup and this audit.

## Modified files

- `src/App.tsx`: cart route and lazy-loaded Firebase/admin/transfer screens.
- `src/components/Navbar.tsx`, `src/styles/Navbar.css`: cart navigation and responsive breakpoint.
- `src/components/SEO.tsx`: product Open Graph type and image alt text.
- `src/pages/ShopPage.tsx`, `ShopProductPage.tsx`, `Shop.tsx`, `shop.css`: Shopify integration while retaining existing layout and branding; contrast/accessibility corrections.
- `src/components/CustomUploadModal.tsx`: type-safe props/errors; request behavior retained.
- `src/data/products.ts`: retained instructions and quote types; removed static transfer inventory/products.
- `src/data/shopProducts.ts`: deprecated, unused migration reference (not an active fallback).
- `api/create-shop-checkout.js`: retired with HTTP 410 after replacement flow passed tests.
- `api/debug-env.js`: retired with HTTP 404; environment details no longer exposed.
- `vercel.json`: product HTML function and API-safe SPA routing.
- `package.json`, `package-lock.json`: scripts, Playwright, compatible security updates, removed Stripe.
- `.gitignore`: environment files, deployment state, test artifacts.
- `.env.local` (ignored): added Shopify domain, collection handle, and empty token placeholder; preserved prior entries. No secret was added to source control.

## Validation

The build, lint, server tests, and six desktop/mobile browser scenarios pass. Schema validation passes. Dependency audit reports zero known vulnerabilities. Browser screenshots revealed unreadable legacy light-on-light product-card text and dark-on-dark prices; corrected with scoped styles. Product/cart browser tests use actual local API handlers plus simulated upstream responses, not real Shopify credentials or a real payment.

See SHOPIFY_SETUP.md for the explicit production verification gate. No deployment, Shopify product changes, TikTok connection, or paid order was performed.

## Live connection follow-up — September 28

Verified the user-supplied private Storefront token without displaying it. Catalog authentication succeeds but returns zero visible products; the configured transfer collection is not visible. An empty Shopify cart was created successfully and its checkout hostname validated. No order, payment, deployment, or product change was made. Product publication is the next prerequisite for live purchase-flow testing.

Live publication follow-up: the Management Has Gone to the Dogs product is now visible at USD 27.99 with two images. Shopify reports its sole Default Title variant as unavailable. Local mobile browser verification confirms rendering, both gallery images, and disabled purchase controls. Live add-to-cart/checkout remains blocked until a purchasable variant exists.
