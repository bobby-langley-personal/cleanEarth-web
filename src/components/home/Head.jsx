import React, {useState, useContext } from "react";
import { Input, Space, Avatar, Button } from "antd";
import { UserContext } from '../../App'
import TodoList from "./TodoList";
const { Search } = Input;

function Head({ setTodoListItems}) {
    const { user } = useContext(UserContext)
    const [newTodo, setNewTodo] = useState(null)

  function addTodo() {
      if(newTodo && newTodo.item && newTodo.item.trim()){
        fetch('https://todo-bl-api.web.app/tasks/' + user.uid, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify(newTodo)
          }) 
          .then(res=> res.json())
          .then(data => setTodoListItems(data))
          .catch(e => console.log('error:', e))
        }
        setNewTodo(null)
      }     
  const greeting = (!user)
    ? 'Guest. Sign up or log in to use the app.'
    : user.displayName || 'User'
  
    const userImage = (!user || !user.photoURL) ? <Avatar size={36} src={"http://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7_grande.png?v=1571606036"}/> : <Avatar size={36} src={user.photoURL}/>
  return (
    <header style={{ textAlign: "center" }}>
      <h1> Welcome, {greeting} {userImage} </h1>
      
      {user && <Space direction="vertical">       
      <Button type="primary" onClick={()=> setTodoListItems() }> Load Events </Button>  <Search
            placeholder="Add tasks here"
            allowClear
            enterButton="Add"
            size="large"
            onSearch={addTodo}
            value={newTodo ? newTodo.item : null}
            onChange={(e) => setNewTodo({item: e.target.value, userId: user.uid })}
        /> 
      </Space>}
        
    </header>
  )
}

export default Head;
