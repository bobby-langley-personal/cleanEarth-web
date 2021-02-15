import React from "react";
import { List } from "antd";

//this is a function not a component
function ToggleItemDone(item, todoListItems, setTodoListItems){
    //need todoListItems
    let updatedTodoList = JSON.parse(JSON.stringify(todoListItems))
    //need the item that was clicked
    const itemIndex = updatedTodoList.findIndex(todoItem => todoItem.item === item.item)
    // for that item, set item.done=!item.done
    updatedTodoList[itemIndex].done = !item.done
    //update state with this new set of values
    setTodoListItems(updatedTodoList)
}

function ListItem({item, todoListItems, setTodoListItems}) {
    const thisClassName = item.done ? 'done' : 'undone'
    return (
    <List.Item 
    key={item.item}
    onClick={()=>ToggleItemDone(item, todoListItems, setTodoListItems)}
    className={thisClassName}>
        {item.item}</List.Item>
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
