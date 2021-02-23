import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { UserContext } from "../../App";
const { Header } = Layout;

// function NavBar() {
//   const { user, setUser, firebaseAuth } = useContext(UserContext);
//   function signOut() {
//     firebaseAuth.signOut()
//       .then(() => {
//         setUser(null);
//         localStorage.setItem('user', null);
//       })
//       .catch((error) => console.log(error));
//   }
function NavBar() {
  const { user, setUser, firebaseAuth } = useContext(UserContext)
  function signOut() {
    firebaseAuth.signOut()
      .then(() => {
        setUser(null)
        localStorage.setItem('user', null)
      })
      .catch((error) => console.log(error))
  }
  return (
    <Header>
      <div className="logo" />
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        {user ? 
          <Menu.Item key="4" onClick={() => signOut()}>
            Logout
          </Menu.Item>
         : 
          <>
            <Menu.Item key="2">
              <Link to="/login">Log In</Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Link to="/signup">Sign Up</Link>
            </Menu.Item>
          </>
        }
      </Menu>
    </Header>
  );
}

export default NavBar;
