import { useEffect, useState } from 'react';
export default function CheckoutResult({ sessionId }: { sessionId: string | null }) {
    const valid = !!sessionId && /^cs_(live|test)_[a-zA-Z0-9]{10,200}$/.test(sessionId);
    const [status, setStatus] = useState<'checking' | 'paid' | 'pending' | 'expired' | 'failed' | 'error'>(valid ? 'checking' : 'error');
    useEffect(() => {
        if (!valid) return;
        const controller = new AbortController();
        fetch(`/api/checkout-status?session_id=${encodeURIComponent(sessionId!)}`, { signal: controller.signal })
            .then(async response => {
                const data = await response.json();
                if (!response.ok || !['paid', 'pending', 'expired', 'failed'].includes(data.status)) throw new Error('Payment verification failed');
                if (!controller.signal.aborted) setStatus(data.status);
            })
            .catch(() => { if (!controller.signal.aborted) setStatus('error'); });
        return () => controller.abort();
    }, [sessionId, valid]);
    const messages = {
        checking: 'Checking your payment with Stripe…',
        paid: 'Payment confirmed. Thank you—PrintFlow Studio will review your order and follow up with production and delivery details.',
        pending: 'Your payment is not confirmed yet. Some payment methods take longer. Please check your Stripe receipt or contact hello@printflowstudio.com before trying another payment.',
        failed: 'Stripe reported that this payment failed. Please check your payment details or contact hello@printflowstudio.com for help.',
        expired: 'This checkout has expired. No payment is confirmed for this session. You can start a new checkout when ready.',
        error: 'We could not confirm a payment reference. Please check your Stripe receipt or email hello@printflowstudio.com before placing another order.',
    };
    return <div className={`pf-status-banner ${status === 'paid' ? 'pf-status-banner--success' : 'pf-status-banner--notice'}`} role="status">{messages[status]}</div>;
}
