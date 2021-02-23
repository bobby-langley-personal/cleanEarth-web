import React, { useState, useContext } from "react";
import { Input, Space, Avatar } from "antd";
import { UserContext } from "../../App";
const { Search } = Input;

function Head({ setTodoListItems, setLoading }) {
  const { user } = useContext(UserContext);
  const [newTodo, setNewTodo] = useState(null);

  function addTodo() {
    if (newTodo && newTodo.item && newTodo.item.trim()) {
      setLoading(true);
      fetch("https://todo-bl-api.web.app/tasks/" + user.uid, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newTodo),
      })
        .then((res) => res.json())
        .then((data) => {
          setTodoListItems(data);
          setLoading(false);
        })
        .catch((e) => {
          setLoading(false)
          console.log("error:", e)
        });
    }
    setNewTodo(null);
  }

  const greeting = !user
    ? "Guest. Sign up or log in to use the app."
    : user.displayName || "User";

  const userImage =
    !user || !user.photoURL ? (
      <Avatar
        size={36}
        src={
          "http://cdn.shopify.com/s/files/1/1061/1924/products/Poop_Emoji_7b204f05-eec6-4496-91b1-351acc03d2c7_grande.png?v=1571606036"
        }
      />
    ) : (
      <Avatar size={36} src={user.photoURL} />
    );
  return (
    <header style={{ textAlign: "center", paddingBottom: "40px" }}>
      <h1>
        {" "}
        Welcome, {greeting} {userImage}{" "}
      </h1>

      {user && (
        <Space direction="vertical">
          <Search
            placeholder="Add tasks here"
            allowClear
            enterButton="Add"
            size="large"
            onSearch={addTodo}
            value={newTodo ? newTodo.item : null}
            onChange={(e) =>
              setNewTodo({ item: e.target.value, userId: user.uid })
            }
          />
        </Space>
      )}
    </header>
  );
}

export default Head;
