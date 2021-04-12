import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import firebase from "firebase";
import { Col, Layout, Row } from "antd";

import Home from "./scenes/Home";
import Login from "./scenes/login";
import Signup from "./scenes/signup";
import "./App.css";
import EventForm from "./components/event/eventForm";
import EventDetails from "./components/event/eventDetailsPg";
import SiderMenu from "./components/common/Sider";
import UserEventList from "./components/event/userEvents";
import Userpage from "./scenes/userPage";
const { Content, Footer, Header } = Layout;
const { firebaseConfig } = require("./config");

firebase.initializeApp(firebaseConfig);
const firebaseAuth = firebase.auth();
export const UserContext = createContext(null);

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")) || null);

  return (
    <>
      <UserContext.Provider value={{ user, setUser, firebaseAuth }}>
        <Router>
          <Layout>
            <Header className="ant-layout-header">
              <Row justify="space-between">
                <Col span={7}>
                  <h1 >
                    <Link className="welcome" to="/" style={{fontSize:"26px"}} > <img style={{marginRight: "7px"}} width={24} height={24} src="\circle-cropped.png"></img> Clean Earth </Link>
                  </h1>
                </Col>
                <Col span={17} style={{float:"right"}}>
                  <SiderMenu />
                </Col>
              </Row>
            </Header>
            <Row justify="space-around">
              <Col span={24}>
                <Content style={{ padding: "24px", minHeight: "80vh"  }}>
                  <Switch>
                    <Route path="/event/:eventId" component={EventDetails} />
                    <Route path="/event-form/:mode/:id?" component={EventForm} />
                    <Route path="/user-events/" component={UserEventList} />
                    <Route path="/user/" component={Userpage} />
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/" component={Home} />

                  </Switch>
                </Content>
              </Col>
            </Row>
            <Footer style={{ textAlign: "center" }}>©2021 Created by Bobby Langley</Footer>
          </Layout>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
