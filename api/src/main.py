from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

todos = [{"id": 1, "text": "Buy groceries", "completed": False},
         {"id": 2, "text": "Do laundry", "completed": False},
         {"id": 3, "text": "Clean house", "completed": False}
         ]

highest_id = 3


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/todos")
async def get_todos():
    return {"todos": todos}


@app.post("/todos")
async def add_todo(todo: dict):
    global highest_id
    highest_id += 1
    new_todo = {
        "id": highest_id,
        "text": todo.get("text", ""),
        "completed": todo.get("completed", False)
    }
    todos.append(new_todo)
    return {"todo": new_todo}


@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    todos = [todo for todo in todos if todo["id"] != todo_id]

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
