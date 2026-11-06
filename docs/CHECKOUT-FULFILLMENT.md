# Checkout verification and owner notifications

The shop return page verifies payment server-side with Stripe rather than trusting the `paid=1` URL parameter. Only marked PrintFlow checkout sessions are exposed, and no customer information is returned.

`/api/stripe-webhook` verifies Stripe's raw-body signature and retrieves the current session. Paid completion and asynchronous success send order details to hello@printflowstudio.com through Resend. A provider idempotency key and persisted Stripe metadata marker prevent ordinary duplicate deliveries. Errors return 500 for Stripe retries. Asynchronous failure records a failed payment and never triggers fulfillment.

## Production configuration

Production endpoint https://www.printflowstudio.com/api/stripe-webhook is registered in PrintFlow Studio.com account acct_1TEdZsP5Liq2Kt7e as we_1UYsVAP5Liq2Kt7eJ6HhuGTl (API version 2026-02-25.clover), subscribed to checkout.session.completed, checkout.session.async_payment_succeeded, and checkout.session.async_payment_failed. Its signing secret is saved as a production-only secret STRIPE_WEBHOOK_SECRET in Vercel. Never commit the value or use it for sandbox events. A deployment after saving the secret is required. Rotate it from Stripe Workbench and update Vercel together.

Owner confirmed $5.99 flat U.S. shipping per order and free Chattanooga pickup. Product pages offer a delivery selector; the server validates it, sets the delivery metadata, charges shipping only for shipped orders, and omits shipping-address collection for pickup. Custom quote shipping remains quoted individually. Owner reports no sales-tax registrations, so automatic tax remains disabled; do not interpret this as a determination that registration is unnecessary.

Validation: 67 automated tests, ESLint, and production build passed. Live Stripe checkout totals were verified for shipping ($33.98 for one tee) and pickup ($27.99). Signed webhook tests cover paid, unpaid, failed asynchronous, replay, and invalid signature cases. No real payment was made; an end-to-end paid-order email from an actual Stripe payment has not been confirmed.
