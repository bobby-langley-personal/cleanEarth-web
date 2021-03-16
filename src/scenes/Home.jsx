import React, { useState, useEffect, useContext } from "react";
import { UserContext } from "../App";
import EventList from "../components/home/EventList";
import { Col, Row, Spin } from "antd";
import { Link } from "react-router-dom";


function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(user)
    if (user) {
      setLoading(true);
      fetch("https://us-central1-cleanearth-api.cloudfunctions.net/app/events")
        .then((res) => res.json())
        .then((data) => {
          setEvents(data); console.log('data', data)
          setLoading(false);
        })
        .catch((e) => {
          console.log(e)
          setLoading(false)
        });
    } else {
      setEvents([]);
      setLoading(false);
    }
  }, [user]);
  console.log(events)

  return (

    <>
    {loading ? (  
    <div style={{textAlign: "center" }} >
    <Spin style={{textAlign: "center" }}  size="large" /> </div>
  ) : (
       user ? (
      <Row justify="space-around" >
      <Col span={20} >
        <EventList  
        events={events}
        setEvents={setEvents}
        loading={loading}
        setLoading={setLoading}
      />
      </Col>
      </Row>
      ) : (
        <Row justify="space-around" className="localHost">
          <Col className="localHost" >
        
          <h1 style={{textAlign: "center", fontSize: "54px"}} >
          <img  width={100} height={100} src="\circle-cropped.png"></img>
          <br/>
            Welcome to Clean Earth!
          </h1>
          <Col span={19} justify="center" style={{textAlign: "center"}} >
          <h3 style={{textAlign: "center", fontSize: "27px", fontStyle: "italic"}}>
            This is a site where you can connect with others about volunteer opportunities near you! <br/>
            <h3 style={{textAlign: "center", fontSize: "27px", fontStyle: "italic"}}>Help clean up the Earth!</h3>
          </h3>
          <h4  style={{textAlign: "center" , fontSize: "18px"}}> To view the full site, please <Link to="/login">log in</Link> or <Link to="/signup">sign up</Link>! </h4>
          </Col>
          </Col>
        </Row>
      
      ))
    } 
      
    </>
  );
}

export default Home;
