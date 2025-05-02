import React,{useReducer,useState} from 'react'

const todoReducer=(state,action)=>{
    switch(action.type){
        case 'Add_ToDo':
            return [...state,{id:Date.now(),text:action.payload}];
        case 'Remove_ToDo':
            return state.filter(todo=>todo.id!==action.payload)
        default:
            return state
    }
}

const TodoApp = () => {
    let [todos,dispatch]=useReducer(todoReducer,[])
    let [newToDo,setNewTodo]=useState('')
  return (
    <div>
        <input type="text" value={newToDo} onChange={(event)=>setNewTodo(event.target.value)} />
        <button onClick={()=>dispatch({type:'Add_ToDo',payload:newToDo})}>Add TODO</button>
        <ul>{todos.map(todo=>{
            <li key={todo.id}>{todo.text}
            <button onClick={()=>dispatch({type:'Remove_ToDo',payload:todo.id})}>Remove</button>
            </li>
        })}</ul>
      
    </div>
  )
}

export default TodoApp
