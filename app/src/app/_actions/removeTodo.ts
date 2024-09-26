export async function removeTodo(id: string) {
    const response = await fetch(`http://localhost:8000/todos/${id}`, {
        method: "DELETE",
    });
    const data = await response.json();
    return data;
}