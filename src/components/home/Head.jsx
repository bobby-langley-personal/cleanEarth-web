import React, {useState} from "react";
import { Input, Space, } from "antd";
const { Search } = Input;

function Head({todoListItems, setTodoListItems}) {
    const [newTodo, setNewTodo] = useState(null)
  function addTodo() {
    setTodoListItems([...todoListItems, newTodo])
    localStorage.setItem('todoList', JSON.stringify([...todoListItems, newTodo]))
    setNewTodo(null)
  }     

  return (
    <header style={{ textAlign: "center" }}>
      <h1> Welcome, freaks. </h1>
      <h2> "To do" is two words or hyphenated</h2>
      <Space direction="vertical">
      <Search
            placeholder="input search text"
            allowClear
            enterButton="Add to list"
            size="large"
            onSearch={addTodo}
            value={newTodo ? newTodo.item : null}
            onChange={(e) => setNewTodo({item: e.target.value, done: false})}
        />
      </Space>
    </header>
  );
}

export default Head;
