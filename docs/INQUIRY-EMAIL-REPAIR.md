# Website inquiry delivery

Contact messages, custom quotes and custom DTF artwork requests POST to `/api/submit-inquiry`. The Vercel server validates each request and sends a transactional email through Resend to the fixed owner inbox `hello@printflowstudio.com`. The customer's email is Reply-To. No customer-controlled recipient or sender is accepted.

The sending-only Resend credential is restricted to `printflowstudio.com` and saved as a sensitive Vercel environment variable for Production and Preview. It is never sent to the browser. Existing receiving MX records were preserved; only Resend DKIM and the sending subdomain's SPF/bounce MX were added. The domain is verified.

New inquiries are delivered to email, rather than written from public browsers into Firebase. Firebase administrative access and historical records remain available. The former Firestore permissions failure no longer blocks customers. The privacy policy names the current inquiry delivery provider.

Artwork supports PNG, JPG, PDF and SVG up to 2 MB, attached directly to the notification. Larger files should be emailed to the owner. The server validates file signature, extension, size and Base64 encoding. This keeps payloads within the serverless request limit.

The UI retains all entries on failure and shows success only after the email provider accepts delivery. A stable reference and deterministic provider idempotency key protect retries from duplicate notifications. Origin checks, a fixed recipient, bounded per-instance rate limiting, and a contact-form honeypot reduce abuse. Rate limits are per server instance; they are not a distributed quota.

Tests cover recipient/reply-to, complete project details, attachments, invalid requests, missing credentials, provider errors, network failures, duplicate retries and rate limits. Production delivery must also be verified in the owner inbox; provider acceptance alone is not proof of inbox arrival.

## Live verification — November 6, 2026

Submitted the actual live contact form and seven-step quote form. Both showed confirmation and both test emails arrived in the owner Gmail inbox, not just the provider queue. The quote notification included the SVG artwork attachment. Tests were clearly labeled owner verification / no customer order. DTF custom-upload calls to action use the same repaired quote path.
