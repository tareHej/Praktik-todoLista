export async function createCheckoutSession (priceId: string) {
    const response = await fetch ("http://localhost:8000/create-checkout-session", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
    });

    const data = await response.json();
    return data;
}