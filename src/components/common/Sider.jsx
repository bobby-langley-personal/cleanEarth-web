import React, { useContext } from "react";
import { Menu, Layout, Divider } from "antd";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import Avatar from "antd/lib/avatar/avatar";
import {
  MenuUnfoldOutlined,
  HomeOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  SettingOutlined,
  BarsOutlined,
} from "@ant-design/icons";
const { Sider } = Layout;

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
  return (
    <Sider className="ant-layout-sider">
      <div />
      <Menu mode="inline" defaultSelectedKeys={["1"]} >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<BarsOutlined />}>
          <Link to="/events">All Events</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<HomeOutlined />}>
          <Link to="/">Your Events</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<HomeOutlined />}>
          <Link to="/event-form/create">Create New Event</Link>
        </Menu.Item>
        <Divider />
        <Menu.Item key="5" icon={<SettingOutlined />}>
          nav 3
        </Menu.Item>
        <Divider />
        {user ? (
          <Menu.Item key="6" onClick={() => signOut()}>
            {<Avatar size={36} src={user.photoURL} />} Logout
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
      </Menu>
    </Sider>
  );
}

export default SiderMenu;
