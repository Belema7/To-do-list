import React, { useState } from 'react';
import { BiEdit, BiTrash } from 'react-icons/bi';
import './CSS/style.css'

function TodoList() {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [editId, setEditId] = useState(null);

  const inputHandler = (event) => {
    setInputValue(event.target.value);
  };

  const addTask = (e) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: inputValue } : todo
        )
      );
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: inputValue, completed: false }]);
    }

    setInputValue('');
  };

  const toggleTask = (id) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTask = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo_cont">
      <h1>To-Do List</h1>
      <form onSubmit={addTask} className="input-cont">
        <input
          type="text"
          className="input-field"
          value={inputValue}
          onChange={inputHandler}
          placeholder="Add a new task"
        />
        <div className="button-group">
          <button type="submit" className="add-btn">
            Add
          </button>
        </div>
      </form>

      <ul className="todo-list">
        {todos.length === 0 ? (
          <p>No tasks yet. Add one above!</p>
        ) : (
          todos.map((todo) => (
            <li key={todo.id} className={todo.completed ? 'completed' : ''}>
              <span onClick={() => toggleTask(todo.id)}>{todo.text}</span>
              <div className="task-buttons">
                <button
                  className="edit-btn"
                  onClick={() => {
                    setInputValue(todo.text);
                    setEditId(todo.id);
                  }}
                >
                  <BiEdit />
                </button>
                <button className="delete-btn" onClick={() => deleteTask(todo.id)}>
                  <BiTrash />
                </button>
              </div>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;
