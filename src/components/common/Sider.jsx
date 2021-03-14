import React, { useContext } from "react";
import { Menu, Layout, Divider } from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Avatar from "antd/lib/avatar/avatar";
import {
  
  UserOutlined
  
} from "@ant-design/icons";
const { Sider } = Layout;
const rightStyle = {position: 'absolute', top: 0, right: 0}


function SiderMenu() {
  const { user, setUser, firebaseAuth } = useContext(UserContext);
  function signOut() {
    firebaseAuth
      .signOut()
      .then(() => {
        setUser(null);
        localStorage.setItem("user", null);
      })
      .catch((error) => console.log(error));
  }
  const userImage =
    !user || !user.photoURL ? (
      <Avatar size={36} src={"https://pbs.twimg.com/profile_images/1237550450/mstom_400x400.jpg"} />
    ) : (
      <Avatar size={24} src={user.photoURL} />
    );
  return (
    <>
      <Menu mode="horizontal" defaultSelectedKeys={["1"]} style={rightStyle}>
          {/* <Menu.Group> */}
        <Menu.Item key="3" icon={<UserOutlined />}>
          <Link to="/user/">Profile Page</Link>
        </Menu.Item>
        {/* </Menu.Group> */}
        {/* <Menu.Group align="right"> */}
        {user ? (
          <Menu.Item key="6" onClick={() => signOut()}>
            {<Avatar size={36} src={userImage} />} Logout
          </Menu.Item>
        ) : (
          <>
            <Menu.Item key="7">
              <Link to="/login">Log In</Link>
            </Menu.Item>
            <Menu.Item key="8">
              <Link to="/signup">Sign Up</Link>
            </Menu.Item>
          </>
        )}
        {/* </Menu.Group> */}
      </Menu>
    </>
  );
}

export default SiderMenu;
