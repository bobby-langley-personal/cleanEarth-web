import React from "react";
import { List, Button } from "antd";
import {DeleteTwoTone} from '@ant-design/icons'


function itemAction(action, item, setLoading, setTodoListItems) {
  setLoading(true)
  const API_URL = `https://todo-bl-api.web.app/tasks/${item.userId}/${item.id}`
  const params = (action === 'done')
    ? {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ done: !item.done })
    }
    : {
      method: 'DELETE'
    }
  fetch(API_URL, params)
  .then(res => res.json())
  .then(data => {
    setTodoListItems(data)
    setLoading(false)
  })
  .catch(err => {
    console.log('error updating item: ', err)
    setLoading(false)
  })
}

function ListItem({item, setLoading, setTodoListItems}) {
    const thisClassName = item.done ? 'done' : 'undone'
    return (
    <List.Item 
    actions= {[
      // <Button primary key="list-done" type="link" onClick={()=>toggleItemDone( item, setLoading, setTodoListItems)} > Done </Button>,
      <Button danger key="list-delete" type="link" onClick={()=> itemAction('done', item, setLoading, setTodoListItems)} > Done </Button>,
      <Button danger key="list-delete" type="link" onClick={()=> itemAction('delete', item, setLoading, setTodoListItems)} > <DeleteTwoTone/> </Button>,
      // <Button danger key="list-delete" type="link" onClick={()=> deleteTask(item, setTodoListItems, setLoading)} > <DeleteTwoTone/> </Button>
    ]}
      key={item.id}
    className={thisClassName}
    
    >
      
        {item.item}
        </List.Item>
    )                    
}


function TodoList({todoListItems, setTodoListItems, loading, setLoading}) { 

  return (
    <List
      size="large"
      loading={loading}
      bordered
      dataSource={todoListItems}
      renderItem={(item) => 
      <ListItem 
      setLoading = {setLoading}
      setTodoListItems={setTodoListItems} item={item}/>}
      
    />
  );
}

export default TodoList;
