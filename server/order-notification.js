function formatAddress(address) {
  if (!address) return 'Not provided';
  return [address.line1, address.line2, [address.city, address.state, address.postal_code].filter(Boolean).join(', '), address.country].filter(Boolean).join('\n');
}
export function paidOrderMessage(session) {
  const money = amount => new Intl.NumberFormat('en-US', { style: 'currency', currency: session.currency || 'usd' }).format((amount || 0) / 100);
  const delivery = session.metadata?.deliveryMethod || 'shipping';
  const lines = session.line_items?.data || [];
  const shipping = session.collected_information?.shipping_details || session.shipping_details;
  return {
    from: 'PrintFlow Studio Website <website@printflowstudio.com>',
    to: ['hello@printflowstudio.com'],
    ...(session.customer_details?.email ? { reply_to: session.customer_details.email } : {}),
    subject: `Paid PrintFlow order — ${session.metadata?.designId || session.id}`,
    text: [
      'PAYMENT CONFIRMED — REVIEW FOR PRODUCTION',
      `Order reference: ${session.id}`, `Total paid: ${money(session.amount_total)}`,
      `Shipping: ${money(session.total_details?.amount_shipping)}`, `Tax: ${money(session.total_details?.amount_tax)}`,
      `Delivery: ${delivery === 'pickup' ? 'Chattanooga pickup — coordinate with the customer' : 'U.S. shipping'}`,
      `Customer: ${session.customer_details?.name || 'Not provided'}`,
      `Email: ${session.customer_details?.email || 'Not provided'}`, `Phone: ${session.customer_details?.phone || 'Not provided'}`,
      `Design: ${session.metadata?.designName || ''}`, `Design ID: ${session.metadata?.designId || ''}`,
      `Size: ${session.metadata?.size || ''}`, `Color: ${session.metadata?.color || ''}`,
      ...lines.map(line => `${line.quantity} × ${line.description} — ${money(line.amount_total)}`),
      ...(delivery === 'shipping' ? [`Ship to: ${shipping?.name || session.customer_details?.name || ''}`, formatAddress(shipping?.address)] : []),
      '\nConfirm artwork and production details before printing. This is a paid order notification, not an automatic production instruction.',
    ].join('\n'),
  };
}
export async function notifyPaidOrder(session) {
  if (!process.env.RESEND_API_KEY) throw new Error('Order notification delivery is not configured.');
  const result = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}`, 'Content-Type': 'application/json', 'Idempotency-Key': `paid-order/${session.id}` },
    body: JSON.stringify(paidOrderMessage(session)), signal: AbortSignal.timeout(15000),
  });
  const data = await result.json().catch(() => null);
  if (!result.ok || !data?.id) throw new Error('Order notification was not accepted.');
  return data.id;
}
