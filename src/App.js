import React, { useState, createContext } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import firebase from "firebase";
import { Col, Layout, Row } from "antd";

import Home from "./scenes/Home";
import Login from "./scenes/login";
import Signup from "./scenes/signup";
import "./App.css";
import EventForm from "./components/event/eventForm";
import EventDetails from "./components/event/eventDetailsPg";
import SiderMenu from "./components/common/Sider";
import Title from "antd/lib/typography/Title";
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
          <Layout style={{minHeight:"100vh"}}>
            <Header className="ant-layout-header">
            <Title level={1}> Project Name </Title>
              </Header>
            <Layout>
            <SiderMenu />
            <Layout className="layout">
              <Row justify="space-around">
                <Col span={24}>
                  <Content style={{ padding: "0 50px" }}>
                    
                    <Switch>
                      <Route path="/event/:eventId" component={EventDetails} />
                      <Route path="/event-form/:mode/:id?" component={EventForm} />
                      <Route path="/user-events/" component={UserEventList} />
                      <Route path="/user/" component={Userpage} />
                      <Route path="/login" component={Login} />
                      <Route path="/signup" component={Signup} />
                      <Route path="/" component={Home} />
                    </Switch>
                    {/* </div> */}
                  </Content>
                </Col>
              </Row>
            </Layout>
            </Layout>
          <Footer style={{ textAlign: "center" }}>©2021 Created with love and support from Boca Code</Footer>
          </Layout>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
