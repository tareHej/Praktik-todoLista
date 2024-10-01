'use server'

export async function setSelectedLanguage(language: string) {
    const response = await fetch("http://localhost:8000/language", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ language }),
        cache: 'no-store'
    });
    const data = await response.json();

    
    return data;
}