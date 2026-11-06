# PrintFlow Studio logo and SEO update — November 6, 2026

## Changes

- Supplied transparent white-and-purple PNG used unmodified in the desktop header, mobile drawer, footer, and legacy hero component. White background panels removed; intrinsic aspect ratio retained.
- Default social previews now show actual PrintFlow apparel, with site name, locale, and descriptive image text.
- Organization identity points to the complete approved light-surface logo for Google's light search surfaces; this image is metadata only. All visible storefront logos use the supplied transparent asset.
- Added linked WebPage entities. Article schema includes the already-published article date, actual article image, and publisher. No invented address, reviews, stock, or ratings.
- Inter is self-hosted with its license and a font preload.
- Firebase quote-upload code loads when submitting a quote rather than on every homepage visit. Main JavaScript decreased from approximately 839 KB to 476 KB minified (254 KB to 140 KB gzipped). These are build measurements, not field Core Web Vitals.

## Discovery

Search Console verified access through the existing Google Analytics tag. Its overview reported one indexed page and no field Core Web Vitals data. No sitemap had been submitted in this URL-prefix property. Submitted https://www.printflowstudio.com/sitemap.xml; Google reported “Sitemap processed successfully” and 40 discovered pages. Discovery does not mean all 40 pages are indexed.

## Verification

- Production build and lint pass.
- 44 automated checks pass, including 40 prerendered pages with unique titles/descriptions, canonical URLs, image references, internal links, structured data, and sitemap consistency.
- Expanded SEO assertions verify transparent logo usage, WebPage entities, and Article metadata.
- Desktop and 390px mobile logo appearance inspected. Mobile document width is 390px with no horizontal overflow.
- Existing purchase IDs, prices, URLs, checkout connections and quote destinations retained.

## Limits and follow-up

Google controls indexing, snippets, rich results, and rankings. Search Console processing can lag. No ranking or Core Web Vitals score is claimed. Continue monitoring page indexing and performance; publish useful original project examples and printing guides. No new submission to Firebase was created as part of this update.
