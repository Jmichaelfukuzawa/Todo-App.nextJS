import { useState } from "react";

export default function Home() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [editedTodoText, setEditedTodoText] = useState("");

  const addTodo = () => {
    if (newTodo.trim() !== "") {
      setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
      setNewTodo("");
    }
  };

  const handleDelete = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (id, text) => {
    setEditingTodoId(id);
    setEditedTodoText(text);
  };

  const saveEdit = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, text: editedTodoText } : todo
      )
    );
    setEditingTodoId(null);
    setEditedTodoText("");
  };

  const toggleComplete = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black">
      <main className="p-8 border rounded-md border-black-300 bg-white shadow-lg">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">My Todo List!!!</h1>

        <div className="mb-8 flex items-center">
          <input
            type="text"
            placeholder="Add a new todo..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            className="flex-grow p-3 border rounded mr-5 text-gray-700"
          />
          <button onClick={addTodo} className="bg-blue-500 text-white p-3 rounded">
            Add Todo
          </button>
        </div>

        <ul className="text-left">
          {todos.map((todo) => (
            <li key={todo.id} className="mb-4 flex items-center">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleComplete(todo.id)}
                className="mr-3"
              />
              {editingTodoId === todo.id ? (
                <>
                  <input
                    type="text"
                    value={editedTodoText}
                    onChange={(e) => setEditedTodoText(e.target.value)}
                    className="flex-grow p-3 border rounded mr-2 text-gray-700"
                  />
                  <button onClick={() => saveEdit(todo.id)} className="bg-blue-500 text-white p-3 rounded">
                    Save
                  </button>
                </>
              ) : (
                <>
                  <span
                    style={{ textDecoration: todo.completed ? "line-through" : "none" }}
                    className={`flex-grow cursor-pointer text-lg ${todo.completed ? "text-gray-500" : "text-gray-800"}`}
                  >
                    {todo.text}
                  </span>
                  <button
                    onClick={() => handleEdit(todo.id, todo.text)}
                    className="ml-3 p-2 bg-blue-500 text-white rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo.id)}
                    className="ml-3 p-2 bg-red-500 text-white rounded"
                  >
                    Delete
                  </button>
                </>
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}
