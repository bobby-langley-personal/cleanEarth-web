import React, { useState, useContext } from "react";
import { Input, Space, Avatar } from "antd";
import { UserContext } from "../../App";
const { Search } = Input;

function Head({ setEvents, setLoading }) {
  const { user } = useContext(UserContext);
  
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
      <Avatar size={24} src={user.photoURL} />
    );
  return (
        
  <>
  </>      
   
  );
}

export default Head;
