interface Todo {
    text: string;
    completed: boolean;
}

export async function addTodo(todo: Todo) { 
    const response = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(todo),
    });
    const data = await response.json();
    return data;
}