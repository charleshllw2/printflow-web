# Checkout verification and owner notifications

The shop return page verifies payment server-side with Stripe rather than trusting the `paid=1` URL parameter. Only marked PrintFlow checkout sessions are exposed, and no customer information is returned.

`/api/stripe-webhook` verifies Stripe's raw-body signature and retrieves the current session. Paid completion and asynchronous success send order details to hello@printflowstudio.com through Resend. A provider idempotency key and persisted Stripe metadata marker prevent ordinary duplicate deliveries. Errors return 500 for Stripe retries. Asynchronous failure records a failed payment and never triggers fulfillment.

## Activation still required

Register the production endpoint at https://www.printflowstudio.com/api/stripe-webhook in the correct Stripe account with checkout.session.completed, checkout.session.async_payment_succeeded, and checkout.session.async_payment_failed. Store the endpoint signing secret as STRIPE_WEBHOOK_SECRET in production and redeploy. Do not reuse a sandbox secret. Verify delivery in sandbox before treating order notifications as operational.

Shipping price, pickup charges, and sales-tax registration details have not yet been supplied by the owner. This change does not alter checkout charges or enable Stripe Tax. Inspect existing Stripe Tax settings and registrations before configuring collection; confirm product tax classification and pickup location with the owner.

Validation: 64 automated tests, ESLint, and production build passed. No real payment was made. The webhook is not yet registered and no end-to-end paid-order delivery has been confirmed.
