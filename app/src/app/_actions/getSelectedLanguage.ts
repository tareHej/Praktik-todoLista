export async function getSelectedLanguage() {
    const response = await fetch("http://localhost:8000/language", {
        cache: 'no-store'
    });
    const data = await response.json();

    console.log({data});
    
    return data;
}