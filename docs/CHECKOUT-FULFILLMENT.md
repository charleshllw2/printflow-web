# Checkout verification and owner notifications

The shop return page verifies payment server-side with Stripe rather than trusting the `paid=1` URL parameter. Only marked PrintFlow checkout sessions are exposed, and no customer information is returned.

`/api/stripe-webhook` verifies Stripe's raw-body signature and retrieves the current session. Paid completion and asynchronous success send order details to hello@printflowstudio.com through Resend. A provider idempotency key and persisted Stripe metadata marker prevent ordinary duplicate deliveries. Errors return 500 for Stripe retries. Asynchronous failure records a failed payment and never triggers fulfillment.

## Activation still required

Register the production endpoint at https://www.printflowstudio.com/api/stripe-webhook in the correct Stripe account with checkout.session.completed, checkout.session.async_payment_succeeded, and checkout.session.async_payment_failed. Store the endpoint signing secret as STRIPE_WEBHOOK_SECRET in production and redeploy. Do not reuse a sandbox secret. Verify delivery in sandbox before treating order notifications as operational.

Owner confirmed $5.99 flat U.S. shipping per order and free Chattanooga pickup. Product pages offer a delivery selector; the server validates it, sets the delivery metadata, charges shipping only for shipped orders, and omits shipping-address collection for pickup. Custom quote shipping remains quoted individually. Owner reports no sales-tax registrations, so automatic tax remains disabled; do not interpret this as a determination that registration is unnecessary.

Validation: 64 automated tests, ESLint, and production build passed. No real payment was made. The webhook is not yet registered and no end-to-end paid-order delivery has been confirmed.
