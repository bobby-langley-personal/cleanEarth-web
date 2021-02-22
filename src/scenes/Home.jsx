import React, { useState, useEffect, useContext } from "react"
import {UserContext} from '../App'
import Head from "../components/home/Head";
import TodoList from "../components/home/TodoList";

//load to do list items on log in
//figure out delete button
function Home() {
  const [todoListItems, setTodoListItems] = useState([])
  const { user } = useContext(UserContext)
  useEffect(() => { 
    if(user){
  fetch("https://todo-bl-api.web.app/tasks/" + user.uid)
  .then(res=> res.json())
  .then(data => setTodoListItems(data))
  .catch(e => console.log(e))
    } else {
      setTodoListItems([])
    }
}, [user])
  return (
    <>
     
            <Head
              todoListItems={todoListItems}
              setTodoListItems={setTodoListItems}
            />
            <TodoList 
              todoListItems={todoListItems}
              setTodoListItems={setTodoListItems}
              
            />
                
         
    </>
  );
}

export default Home;
