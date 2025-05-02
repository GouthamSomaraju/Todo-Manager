import { useReducer, useCallback } from "react";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [...state, { id: Date.now(), title: action.payload, completed: false }];
    
    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload ? { ...todo, completed: !todo.completed } : todo
      );

    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
};

// Custom Hook for managing todos
const useTodos = () => {
  const [todos, dispatch] = useReducer(todoReducer, []);

  const addTodo = useCallback((title, setNewTodo) => {
    if (title.trim() !== "") {
      dispatch({ type: "ADD_TODO", payload: title });
      setNewTodo(""); // Clear input after adding
    }
  }, []);

  const toggleTodo = useCallback((id) => {
    dispatch({ type: "TOGGLE_TODO", payload: id });
  }, []);

  const removeTodo = useCallback((id) => {
    dispatch({ type: "REMOVE_TODO", payload: id });
  }, []);

  return { todos, addTodo, toggleTodo, removeTodo };
};

export default useTodos;