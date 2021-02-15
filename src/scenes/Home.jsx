import React, { useState } from "react";
import { Layout } from "antd";
import NavBar from "../components/common/NavBar";
import Head from "../components/home/Head";
import TodoList from "../components/home/TodoList";

const { Content, Footer } = Layout;

function Home() {
  const initialItems = JSON.parse(localStorage.getItem("todoList")) || [
    { item: "Do this", done: false },
    { item: "Do that", done: false },
    { item: "Do the other", done: false },
  ];
  const [todoListItems, setTodoListItems] = useState(initialItems);

  return (
    <>
      <Layout className="layout">
        <NavBar />
        <Content style={{ padding: "0 50px" }}>
          <div className="site-layout-content">
            <Head
              todoListItems={todoListItems}
              setTodoListItems={setTodoListItems}
            />
            <TodoList 
              todoListItems={todoListItems}
              setTodoListItems={setTodoListItems}
            />
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          ©2099 Created by some punk.
        </Footer>
      </Layout>
    </>
  );
}

export default Home;
