"use client";

import { useEffect, useState } from 'react';
import { getTodos } from '../_actions/getTodos';
import { addTodo } from '../_actions/addTodo';
import { removeTodo } from '../_actions/removeTodo';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodoText, setNewTodoText] = useState('');

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();
      console.log(todos);
      const fetchedTodos = todos.todos;
      setTodos(fetchedTodos);
    };
    fetchTodos();
  }, []);

  const handleAddTodo = async () => {
    if (newTodoText.trim() !== '') {
      const newTodo= {
        text: newTodoText.trim(),
        completed: false,
      };
      const savedTodo = await addTodo(newTodo);
      setTodos([...todos, savedTodo.todo]);
      setNewTodoText('');
    }
  };

  const handleRemoveTodo = async (id: number) => {
    await removeTodo(id.toString());
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  const toggleTodo = (id: number) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
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
        onChange={(e) => setNewTodoText(e.target.value)} />
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        onClick={handleAddTodo}>Lägg till todo</button>
      <ul className="mt-4">
        {todos.map((todo) => (
          <li key={todo.id.toString()} className="flex items-center mt-2 p-2 border rounded">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              className="form-checkbox h-6 w-6 mr-5"
            />
            <span
              className="flex-grow"
              style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
              {todo.text}
            </span>
            <button
              className="ml-12 px-4 py-2 text-sm bg-red-500 text-white rounded hover:bg-red-700"
              onClick={() => handleRemoveTodo(todo.id)}
            >Ta bort todo</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
