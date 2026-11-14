# Live order tracker

Owner entry: https://www.printflowstudio.com/orders

Use **Continue with Google** in Chrome or Safari, choosing **charleshllw2@gmail.com**. Existing website email/password sign-in is also available. Only the existing Firebase owner UID is authorized by server-side Firestore rules; a different Google account or matching email with a different UID cannot access records. In-app browsers may not support the Google popup; use a normal browser.

Find customers by name or phone. Add each customer once with name, phone and optional email; normalized phone numbers reuse the existing customer. Select a customer to add jobs and see previous jobs. Jobs support up to 10 item rows (description, size, quantity), private artwork details and notes, pickup/delivery and an optional requested time. Times entered are device-local and shown to customers in Eastern time. Requested times are preferences, not guaranteed completion times.

Tap a stage to publish progress. Copy the tracking link and share it manually by email, or via Quo when outbound messaging is approved. The app sends no messages. Each link has 256 random bits; anyone holding that link can view that job. Disable the link to revoke access. Re-enabling restores the same link. Customer pages update using Firestore document listeners and show last-update/connection state.

## Data and security

Uses existing Standard Firestore database `(default)` in `printflow-studio-e4a98`, with new collections:
- `trackerCustomers`: owner-only contact directory.
- `trackerJobs`: owner-only job details/history with optimistic version checks.
- `trackerViews`: minimal per-token projection: opaque job ID, reference, stage, requested time, delivery method and server timestamp. Single-document reads only; collection listings are denied even for the owner.

No contact information, customer names, job titles, items, artwork or internal notes are included in a view. Rules allowlist fields and validate every write. Private/public stage changes are atomic. All unrecognized collections remain denied except the pre-existing legacy `/orders` rule, which is preserved unchanged; the new tracker never stores data there. Legacy Sites Order Desk uses a separate D1 database and ChatGPT authentication. Its records were not migrated or modified.

Private owner and tracking routes use an advertising/analytics-free HTML shell, no-index/no-referrer headers, private/no-store caching, and are excluded from sitemap and robots indexing. Tracking data is never prerendered into public HTML.

Rules source: `firestore.rules`. Configuration: `firebase.json`. Deploy only rules with `firebase deploy --only firestore:rules --project printflow-studio-e4a98`. Preserve unrelated rules; back up the current release first.

## Validation

`npm run build`, `npm run lint`, `npm test` (67 existing tests). `npm run test:tracker` runs the Firebase emulator security/integration suite; requires Firebase CLI and Java 21+. The suite covers owner access, unauthenticated and wrong-UID denial, list denial, private-field injection, field/stage validation, atomic updates, two jobs for one customer, persistence across SDK sessions, a live guest listener, isolation and revocation. All emulator data is cleared.

Browser verification uses sample customer `Tracker Verification Sample`, reserved phone `202-555-0143`, and `example.invalid` email. Tested owner Google sign-in, save customer/order, second job, requested delivery time, phone search, reload persistence, copy link, six live stages across Chrome owner and separate guest browser, and mobile layout. Clean up only these identified sample records; never delete unrelated customer data.
