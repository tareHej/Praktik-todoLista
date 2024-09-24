"use client";

import { useState } from 'react';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  const addTodo = () => {
    if (newTodoText.trim() !== '') {
      const newID = Date.now().toString();
      const newTodo: Todo = {
        id: newID,
        text: newTodoText.trim(),
        completed: false,
    };
    setTodos([...todos, newTodo]);
    setNewTodoText('');
  }
};

  const removeTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleTodo = (id:string) => {
    const updatedTodos = todos.map((todo) => {
        if (todo.id === id) {
            return {...todo, completed: !todo.completed };
        }
        return todo;
    });
    setTodos(updatedTodos);
  };

  return (
    <div className="p-6 bg-gray-100 rounded-lg shadow-md">
      <input
        className="p-2 mr-4 border rounded"
        type="text" 
        value={newTodoText} 
        onChange={(e) => setNewTodoText(e.target.value)}/>
      <button 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={addTodo}>Lägg till</button>
      <ul className="mt-4">
        {todos.map((todo) => (
            <li key={todo.id} className="flex items-center mt-2 p-2 border rounded">
                <input 
                    type="checkbox" 
                    checked={todo.completed} 
                    onChange={() => toggleTodo(todo.id)}
                    className="form-checkbox h-6 w-6 mr-5"
                />
                <span
                    className="flex-grow"
                    style={{textDecoration: todo.completed ? 'line-through' : 'none' }}> 
                    {todo.text}
                </span>
                <button
                className="ml-12 px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-700" 
                onClick={() => removeTodo(todo.id)}
                >dict.todo.remove</button>
            </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
