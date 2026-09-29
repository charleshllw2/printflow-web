# PrintFlow Studio: Google setup

The preferred website address is https://www.printflowstudio.com/.
Submit https://www.printflowstudio.com/sitemap.xml in Google Search Console.

## Search Console verification

An existing google-site-verification DNS TXT record was found on the domain on September 29, 2026. It has been preserved. The currently signed-in Google account still shows the www URL-prefix property as unverified. The DNS record may belong to another Google account or domain property; its presence alone does not prove ownership for this account.

If using HTML-tag verification, Google supplies a tag like:
`<meta name="google-site-verification" content="YOUR_TOKEN">`

Only the value inside `content` is needed. Send that token to the assistant, which can install it and deploy; no source editing is required. Alternatively, in the existing Vercel printflow-web project's Environment Variables screen, paste just the token into `GOOGLE_SITE_VERIFICATION` for Production and redeploy. The build inserts it into the initial HTML, and checks that a whole HTML tag was not pasted accidentally. No token is invented or enabled by default. Do not remove the existing DNS verification record.

## Google Analytics

The existing Firebase configuration contains GA4 ID `G-MW2N70WBQ4`. The site now loads this ID once using Google's standard tag. The build setting `GA4_MEASUREMENT_ID` overrides the ID if the owner has a different verified web stream; explicitly setting it empty disables this loader. Do not also add the same ID through GTM or Firebase Analytics initialization: that would duplicate collection. Confirm the matching stream in the owner's Google Analytics account and verify a visit in Realtime.

## Automatic maintenance

`npm run build` renders current page components into complete HTML without changing their styles, then generates the sitemap from `src/seo/site.ts` and the real native product catalog. Product additions/removals are reflected at the next build/deployment. The build fails if a new static public route has not been reviewed for inclusion. Private/admin/API, errors and session URLs are excluded.

Product names, prices, artwork and checkout code are preserved. Product offers omit availability because no verified inventory field exists. There are no invented review ratings, hours, street address, coordinates or social profile URLs in schema. LocalBusiness markup describes the service area but does not claim a physical storefront or guarantee a Google local-business rich result.

## Validation

Run `npm run build` and `node --test tests/seo.test.mjs`. SEO checks cover full initial content, one H1, unique metadata, canonicals, JSON-LD, product data, images, sitemap exclusions and incoming links. The old `tests/commerce.test.mjs` and browser Shopify suite still reference removed Shopify code and are not a valid test of the current native shop. They predate this SEO work; the current shop needs its own replacement commerce suite separately.

No FAQPage or self-serving review markup is added. Google's FAQ rich results are limited to authoritative health/government sites; visible FAQs and real customer reviews remain.
