import React, { useState, useRef, useEffect, useMemo } from "react";
import useTodos from "./useTodo";
import "./style.css";

const TodoApp = () => {
  const { todos, addTodo, toggleTodo, removeTodo } = useTodos();
  const [newToDo, setNewTodo] = useState("");
  const [filter, setFilter] = useState("all");

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const filteredTodos = useMemo(() => {
    return todos.filter((todo) => {
      if (filter === "completed") return todo.completed;
      if (filter === "pending") return !todo.completed;
      return true;
    });
  }, [filter, todos]);

  const completedCount = useMemo(() => todos.filter((todo) => todo.completed).length, [todos]);
  const pendingCount = useMemo(() => todos.filter((todo) => !todo.completed).length, [todos]);

  return (
    <div>
      <div style={{ display: "flex", gap: "10px", padding: "20px" }}>
        <button onClick={() => setFilter("all")}>All: {todos.length}</button>
        <button onClick={() => setFilter("completed")}>Completed: {completedCount}</button>
        <button onClick={() => setFilter("pending")}>Pending: {pendingCount}</button>
      </div>

      <input
        type="text"
        value={newToDo}
        onChange={(e) => setNewTodo(e.target.value)}
        ref={inputRef}
      />
      <button onClick={() => addTodo(newToDo,setNewTodo)}>Add TODO</button>

      <ol>
        {filteredTodos.map((todo) => (
          <div key={todo.id} style={{ display: "flex", justifyContent: "space-between" }}>
            <li
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                // textDecorationColor: "black",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {todo.title}
            </li>
            <div style={{ display: "flex" }}>
              <button onClick={() => toggleTodo(todo.id)}>
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button onClick={() => removeTodo(todo.id)}>Remove</button>
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default TodoApp;