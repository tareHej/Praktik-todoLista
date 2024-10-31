export async function checkSubscriptionStatus () {
    const sessionId = localStorage.getItem("stripe_session_id")
    const response = await fetch ("http://localhost:8000/checkout-success", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId })
    });

    const data = await response.json();
    console.log(data);
    return data;
}