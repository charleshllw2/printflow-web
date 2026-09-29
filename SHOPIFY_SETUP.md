# PrintFlow Studio Shopify setup

The integration is implemented locally in **`/Users/charlesholloway/Documents/Development/printflow-web`**. This is the existing customer website, separate from the design-tool projects in `Documents/New project`. Nothing has been deployed and the live site has not changed.

## Your next action

**Add your Shopify private Storefront token to the blank `SHOPIFY_STOREFRONT_ACCESS_TOKEN=` line in this project's `.env.local`.** The store domain is already filled in. Keep existing values in that file. Do not paste credentials into chat.

To obtain it, open Shopify Admin for **theprintflowstudio.myshopify.com**, install/open the **Headless** sales channel, choose **Add storefront** (or your existing PrintFlow storefront), and copy its **private Storefront API access token** from the Storefront API tokens card. This integration specifically uses the PRIVATE token, not the public Storefront token and not an Admin API token. The channel's Storefront API permissions must permit reading products and creating/updating carts; retain the relevant default permissions. No customer-account or Admin API access is needed.

Official instructions: [Manage the Headless channel](https://shopify.dev/docs/storefronts/headless/building-with-the-storefront-api/manage-headless-channels), [Storefront API authentication](https://shopify.dev/docs/api/storefront/2026-07).

## What changed

- Existing React/Vite website, branding, navigation, shop layouts, informational pages, quote forms, and Firebase administration remain in place. This is not a Shopify theme.
- `/shop` reads published products from Shopify; `/shop/:handle` reads images, descriptions, options, prices, and availability. All variant pages are fetched, so products with more than 250 variants are supported.
- `/shop/cart` adds/removes variants and changes quantities through Shopify's Cart API. An HTTP-only same-site cookie retains the full cart ID for up to 10 days. Shopify may expire a cart sooner; the site handles that explicitly. Cookie IDs are not returned to browser JavaScript, URLs, or local storage.
- Secure Checkout fetches the latest Shopify-generated checkout URL. Shopify handles payments, shipping, taxes, buyer information, and orders. Buy Now adds the selected variant to the current cart and checks out that cart.
- `/dtf-transfers` keeps its existing layout, instructions, search, and filters but obtains products from the Shopify `dtf-transfers` collection. Its old fake add-to-cart flow is replaced by real product pages. Existing custom-upload requests remain available for products whose Product type is exactly `Custom`; these still submit a quote request to Firebase, not a paid order. Regular Shopify purchases do not depend on Firebase.
- Product title, description, canonical URL, social-image metadata, and Product JSON-LD are sent in the initial HTML on Vercel and updated by the existing SEO component in the browser. Unknown product URLs return HTTP 404 on Vercel.
- Product responses have a 60-second Vercel CDN lifetime. Cart reads and writes are never cached. Availability is checked again when adding, updating, and checking out. Shopify remains the final authority on stock and purchasable quantities.
- Responsive Shopify CDN image sizes and lazy loading reduce image transfer. Admin/Firebase screens are split out of the main shop bundle; initial JavaScript dropped from about 752 KB to 371 KB before compression.
- The old Stripe checkout endpoint now returns HTTP 410, the public environment-debug endpoint returns 404, and Stripe was removed from dependencies. The old apparel data file is explicitly deprecated and unused, retained only as a migration reference. Static transfer inventory was removed. Old catalog data is also recoverable from Git history.

## Environment settings

| Name | Value / purpose |
| --- | --- |
| `SHOPIFY_STORE_DOMAIN` | `theprintflowstudio.myshopify.com` (hostname only) |
| `SHOPIFY_STOREFRONT_ACCESS_TOKEN` | Private Storefront token from Headless; server secret |
| `SITE_URL` | `https://www.printflowstudio.com`; exact allowed origin for cart mutations, with no trailing slash |
| `SHOPIFY_TRANSFERS_COLLECTION` | `dtf-transfers`, or the handle of your transfer-only Shopify collection |
| `SHOPIFY_CHECKOUT_DOMAIN` | Optional exact custom checkout hostname, only if configured in Shopify |

Use **Node 22 or newer**. `.env.local` is ignored by Git and is loaded by `npm run dev`. `.env.example` has names and safe placeholders only. None of these variables may use a `VITE_` prefix. Local development permits localhost origins. For a Vercel preview, set `SITE_URL` to the exact preview URL in that deployment's environment; production retains the production URL.

Run from this folder:

```sh
npm install
npm run dev
```

Open `http://localhost:5173/shop`. Restart the dev server after changing `.env.local`. The dev command runs Vite and the same API handler used by Vercel. A plain `vite` or static `vite preview` alone does not run the commerce API.

## Managing products

1. Add/edit products in Shopify: title, description, images, price, compare-at price, size/color options, variants, and inventory.
2. Set product status to **Active** and publish it to the **Headless** sales channel used by this token. Merely publishing to Online Store or TikTok does not guarantee visibility to this storefront.
3. Use Product type for the website's category buttons. For transfers, create/publish a collection with the handle `dtf-transfers` and add transfer-only products to it. Keep apparel out of that collection because the page explicitly says garments are not included.
4. Use the existing website handles for the eight old apparel products if you want their links to remain unchanged; see `src/data/shopProducts.ts`. Reserve `cart` for the cart route. Changing a handle later requires a deliberate redirect in `vercel.json`.
5. Refresh the website after a change. Cached catalog responses can take about one minute to refresh; cart operations consult Shopify immediately. The catalog loads 24 products per page with a Load more button; category/search controls filter loaded products.

There is no website product database to copy into. Existing static products are not automatically imported into Shopify; Shopify must contain and publish the products before launch. Ensure sold-out variants are configured not to continue selling if you want purchases blocked at zero inventory. Shopify's “continue selling when out of stock” option intentionally makes those variants purchasable.

## Before production deployment

In the **existing Vercel website project → Settings → Environment Variables**, add the server variables above to the intended deployment environment. Use the private token as a sensitive value. Keep the current domain and Vite build (`npm run build`, output `dist`). Commit/deploy `api/`, `server/`, and `vercel.json` along with the frontend; this must be a Vercel deployment with server functions, not a static-only upload. `api/product-page.js` includes `dist/index.html` via Vercel's includeFiles setting for server product metadata.

Before promoting a preview, verify published products and the transfer collection; check payment configuration, shipping rates/zones, pickup, taxes, store currency/market, policy links, and checkout branding inside Shopify. Visit a direct product URL and confirm both the initial metadata and HTTP 404 behavior. Complete a Shopify test-mode order and verify it appears in Shopify Admin, then restore the intended payment mode. No real payment was made during this implementation.

Do not deploy the integration with an empty token: it intentionally shows a professional shop-unavailable state instead of silently falling back to the old catalog. Existing non-shop pages continue to work.

## Verification and remaining limits

- `npm run build`: passes, including TypeScript; no large-chunk warning after code splitting.
- `npm run lint`: passes (baseline had 13 errors).
- `npm test`: server tests cover configuration, pagination, availability, cart persistence, errors/warnings, CSRF/origin checks, checkout URLs, and escaped metadata.
- `npm run test:e2e`: Chromium desktop and mobile tests exercise the real local API handler with a test-only simulated Shopify upstream. Covers shop → options → cart → quantity → refresh → checkout redirect, sold-out products/variants, single variants, missing images, multiple images, invalid URLs, empty/error states, and transfers.
- Shopify's schema validator accepts the GraphQL operations without deprecated-field warnings.
- `npm audit`: no known vulnerabilities after compatible updates.
- The mock upstream lives only in `tests/mock-shopify.mjs`; normal development and production cannot enable it through an environment flag.

**Live connection verified September 28:** the saved private token authenticates successfully; Shopify created an empty cart without errors and returned a checkout URL on an allowed Shopify hostname. No order or payment was made. The Storefront API currently returns zero products, and the transfer collection is not visible.

**Still unverified:** live product/variant purchasing (requires published products), live checkout/shipping/taxes/order creation, Vercel deployment behavior, and custom-upload delivery to Firebase. These require the store token and configured services. Local product metadata unit tests do not replace deployment verification. No promise of production readiness should be inferred until those checks pass.

The shop follows the Shopify store's default market/currency and supports standard one-time products, up to 99 units per quantity control and 100 cart lines. Subscriptions, bundle configuration, customer accounts, and market/currency selectors are outside this implementation. Product galleries request up to 100 images. The existing custom-upload request UI uses dollar-formatted quotes; keep those custom request products in USD or extend that request UI before selling in another currency.

## TikTok later

Shopify is the shared catalog: **Shopify → PrintFlowStudio.com**, and separately **Shopify → TikTok Shop** through Shopify's TikTok sales channel. This website is not an intermediary that copies products to TikTok. Connect the TikTok channel in Shopify and complete its region/account eligibility, product publishing, shipping, and synchronization setup. No additional website catalog database or TikTok API credentials are needed here.

## Maintenance

The Storefront API is pinned to `2026-07` in `server/shopify.js`. Review supported API versions and validate operations before its support window ends. Avoid running historical `fix_shop.*` or `add_slugs.cjs` scripts: they belong to the retired hard-coded catalog and can overwrite the integration. The complete file audit and implementation manifest are in `SHOPIFY_AUDIT.md`.
