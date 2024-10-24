from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import stripe
import os
from dotenv import load_dotenv

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

load_dotenv()

stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

price_id = os.getenv("PRICE_ID")

user_status = "freemium"


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
    global todos
    global user_status

    if user_status == "freemium" and len(todos) >= 5:
        return {"error": "Freemium användare kan endast lägga till upp till 5 todos"}

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
    global todos
    todos = [todo for todo in todos if todo["id"] != todo_id]

selected_language = "en"


class LanguageRequest(BaseModel):
    language: str


@app.get("/language")
async def get_language():
    return {"language": selected_language}


@app.post("/language")
async def set_language(request: LanguageRequest):
    global selected_language
    selected_language = request.language
    return {"language": selected_language}


class CheckoutRequest(BaseModel):
    priceId: str


@app.post("/create-checkout-session")
async def create_checkout_session(request: CheckoutRequest):
    global user_status

    session = stripe.checkout.Session.create(
        payment_method_types=["card"],
        line_items=[
            {'price': request.priceId, 'quantity': 1},
        ],
        mode="subscription",
        billing_address_collection="auto",
        success_url="http://localhost:3000/",
        cancel_url="http://localhost:3000/",
    )
    return {"session_id": session.id}


@app.post("/checkout-success")
async def checkout_success(sessionId: str):
    global user_status
    print(sessionId)
    session = stripe.checkout.Session.retrieve(sessionId)

    user_status = "paid"

    return

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
