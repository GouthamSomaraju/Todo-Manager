import React, { useReducer, useState, useRef, useEffect,useMemo, useCallback } from "react";
import "./style.css";

const todoReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TODO":
      return [
        ...state,
        { id: Date.now(), title: action.payload, completed: false },
      ];

    case "TOGGLE_TODO":
      return state.map((todo) =>
        todo.id === action.payload
          ? { ...todo, completed: !todo.completed }
          : todo
      );

    case "REMOVE_TODO":
      return state.filter((todo) => todo.id !== action.payload);

    default:
      return state;
  }
};

const TodoApp = () => {
// useRef() for Input Focus
  let inputRef = useRef(null);
// useEffect for focusing
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const [todos, dispatch] = useReducer(todoReducer, []);
  const [newToDo, setNewTodo] = useState("");

  let [filter,setFilter]=useState('all')

  let filteredTodo=useMemo(()=>{

    return todos.filter(todo=>{
      if(filter==='completed') return todo.completed;
      if(filter==='pending')return !todo.completed;
      return true
    })
    
    
  },[filter,todos])

  const completedCount = useMemo(() => {
    return todos.filter(todo => todo.completed).length;
  }, [todos]);
  
  const pendingCount = useMemo(() => {
    return todos.filter(todo => !todo.completed).length;
  }, [todos]);

  let addToDo=useCallback(()=>{
    if(newToDo.trim()!==''){
      dispatch({type:'ADD_TODO',payload:newToDo})
      setNewTodo('')
    }
  },[newToDo])

  let toggleToDo=useCallback((id)=>{
    dispatch({type:'TOGGLE_TODO',payload:id})
  },[])

  let removeToDo=useCallback((id)=>{
    dispatch({type:'REMOVE_TODO',payload:id})
  },[])

  return (
    <div >
       <div style={{display:'flex', gap:'10px', padding:'20px'}}>
        <button onClick={()=>setFilter('all')}>All: {todos.length}</button>
        <button onClick={()=>setFilter('completed')}>Completed: {completedCount}</button>
        <button onClick={()=>setFilter('pending')}>Pending: {pendingCount}</button>
      </div>

      <input
        type="text"
        value={newToDo}
        onChange={(e) => setNewTodo(e.target.value)}
        ref={inputRef}
      />
      <button
        onClick={addToDo}
      >
        Add TODO
      </button>

     

      <ol>
        {filteredTodo.map((todo) => (
          <div key={todo.id} style={{ display: "flex", justifyContent: "space-between" }}>
            <li
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                textDecorationColor: "black",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              {todo.title}
            </li>
            <div style={{ display: "flex" }}>
              <button
                onClick={()=>toggleToDo(todo.id)}
              >
                {todo.completed ? "Undo" : "Complete"}
              </button>
              <button
                onClick={()=>removeToDo(todo.id)}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default TodoApp;
