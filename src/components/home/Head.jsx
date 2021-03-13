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
          "%PUBLIC_URL%/tomFromMyspace.jpg"
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
