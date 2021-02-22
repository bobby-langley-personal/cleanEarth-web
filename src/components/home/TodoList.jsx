import React from "react";
import { List, Button } from "antd";
import {DeleteTwoTone} from '@ant-design/icons'

function deleteTask(item, setResponseMessage){
  return( 
  fetch(`https://todo-bl-api.web.app/tasks/${item.id}`, {
    method: 'DELETE'})
    .then((result) => result.text())
    .then((data) => {
      data.statusCode < 300 ? setResponseMessage(data.message): console.log('error')
    })
    .catch((error) => console.log("error", error))
  

  )}

function ToggleItemDone(item, todoListItems, setTodoListItems){    
    let updatedTodoList = JSON.parse(JSON.stringify(todoListItems))   
    const itemIndex = updatedTodoList.findIndex(todoItem => todoItem.item === item.item)    
    updatedTodoList[itemIndex].done = !item.done  
    setTodoListItems(updatedTodoList)
}

function ListItem({item, todoListItems, setTodoListItems}) {
    const thisClassName = item.done ? 'done' : 'undone'
    return (
    <List.Item 
    dataSource={todoListItems}
    key={item.item}
    onClick={()=>ToggleItemDone(item, todoListItems, setTodoListItems)}
    className={thisClassName}>
        {item.item}
        <Button type="link" onClick={()=> deleteTask(item, todoListItems)} > <DeleteTwoTone/> </Button></List.Item>
    )                    
}


function TodoList({todoListItems, setTodoListItems}) { 

  return (
    <List
      size="large"
      bordered
      dataSource={todoListItems}
      renderItem={(item) => 
      <ListItem todoListItems={todoListItems} 
      setTodoListItems={setTodoListItems} item={item}/>}
      
    />
  );
}

export default TodoList;
