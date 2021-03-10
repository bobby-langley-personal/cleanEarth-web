import React, { useState, createContext } from "react"
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import firebase from 'firebase'
import { Col, Layout, Row } from "antd";
import NavBar from "./components/common/NavBar";
import Home from "./scenes/Home"
import Login from "./scenes/login"
import Signup from "./scenes/signup"
import "./App.css";
import EventForm from "./components/event/eventForm";
import EventDetails from "./components/event/eventDetailsPg";
const { Content, Footer } = Layout;
const { firebaseConfig } = require('./config')


firebase.initializeApp(firebaseConfig)
const firebaseAuth = firebase.auth()
export const UserContext = createContext(null)

function App() {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')) || null)

  return (

    <>
      <UserContext.Provider value={{ user, setUser, firebaseAuth }}>
        <Router>
          <Layout className="layout">
            <NavBar />
            <Row justify="space-around" >
              <Col span={24} >
            <Content style={{ padding: "0 50px" }}>
              {/* <div className="site-layout-content"> */}
                <Switch>
                  <Route path="/event/:eventId" component={EventDetails} />
                  <Route path="/event-form/:mode/:id?" component={EventForm} />
                  <Route path="/login" component={Login} />
                  <Route path="/signup" component={Signup} />
                  <Route path="/" component={Home} />
                </Switch>
              {/* </div> */}
            </Content>
              </Col>
            </Row>
            <Footer style={{ textAlign: "center" }}>
              ©2021 Created with love and support from Boca Code 
        </Footer>

          </Layout>
        </Router>
      </UserContext.Provider>
    </>
  );
}

export default App;
