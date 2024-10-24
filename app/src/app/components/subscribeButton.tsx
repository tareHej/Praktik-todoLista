'use client'

import { loadStripe } from '@stripe/stripe-js';
import { createCheckoutSession } from '../_actions/subscribe';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || '' );

export default function SubscribeButton() {
    const handleSubmit = async () => {
        const priceId = "price_1QA8Lw01kzeNUVr3ZM1vWZpb";
        const { session_id } = await createCheckoutSession(priceId);

        const stripe = await stripePromise;

        if (stripe && session_id) {
            localStorage.setItem("stripe_session_id", session_id)
            stripe.redirectToCheckout({ sessionId: session_id });
        }
    };

    return (
        <button onClick={handleSubmit}>Prenumerera</button>
    )
}