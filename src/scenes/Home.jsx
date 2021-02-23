import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import Head from "../components/home/Head";
import TodoList from "../components/home/TodoList";
      
//figure out delete button
function Home() {
  const [todoListItems, setTodoListItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  useEffect(() => {
    if (user) {
      setLoading(true);
      fetch("https://todo-bl-api.web.app/tasks/" + user.uid)
        .then((res) => res.json())
        .then((data) => {
          setTodoListItems(data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e)
          setLoading(false)
        });
    } else {
      setTodoListItems([]);
      setLoading(false);
    }
  }, [user]);
  return (
    <>
      <Head setTodoListItems={setTodoListItems} setLoading={setLoading} />
      <TodoList
        todoListItems={todoListItems}
        setTodoListItems={setTodoListItems}
        loading={loading}
        setLoading={setLoading}
      />
    </>
  );
}

export default Home;
