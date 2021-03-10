import React, { useEffect, useState } from "react";
import { List, Button, Table, Tag, Space, Layout, Row, Col } from "antd";
import { Link } from "react-router-dom";
import {deleteEvent} from '../home/EventList'
const { Content, Header, Sider } = Layout



export default function EventDetails(props) {
  const [event, setEvent] = useState([])
  const {eventId} = props.match.params

  console.log(props.match.params.eventId)
  console.log("propsss", props.match.params.eventId)

  useEffect(() => {
    fetch(
      "https://us-central1-cleanearth-api.cloudfunctions.net/app/event/" + eventId
    )
      .then((res) => res.json())
      .then((x) => setEvent(x))

      .catch((e) => {
        console.log(e);
        // setLoading(false);
      });

      console.log('this is event', event)
  }, [])


  
  


  return (
    <>
    <div> 
    </div>
    <Header className= "eventHeader" > 
      {event.startTime} {event.endTime} |||||| &nbsp;
      {event.date}
      {event.eventName} 
      
    </Header>()
    
      {event.location}
      {event.weather}
      Address: {event.address}
      <>
      <a href= {"https://maps.google.com/maps?hl=en" + event.location}  target="_blank">map</a>
      </>
      
    
    <div> 
    </div>
    <div> 
    </div>
    <Content> 
      {event.description}
      
    </Content>
    <Row justify="space-around" >
    <Col span={20} >

      
      <Button> <Link to={'/event-form/update/' + event.id }> Edit Event </Link>
      </Button>
     </Col>
     </Row>

    </>
  );
}
