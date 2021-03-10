import React, { useEffect, useState } from "react";
import { List, Button, Table, Tag, Space, Layout, Row, Col, Typography, Divider } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { deleteEvent } from "../home/EventList";
const { Content, Header, Sider } = Layout;
const { Title } = Typography;

export default function EventDetails(props) {
  const [event, setEvent] = useState([]);
  const { eventId } = props.match.params;

  console.log(props.match.params.eventId);
  console.log("propsss", props.match.params.eventId);

  useEffect(() => {
    fetch("https://us-central1-cleanearth-api.cloudfunctions.net/app/event/" + eventId)
      .then((res) => res.json())
      .then((x) => setEvent(x))

      .catch((e) => {
        console.log(e);
        // setLoading(false);
      });

    console.log("this is event", event);
  }, []);
  console.log(event.startTime);
  return (
    <div>
      <Header className="eventHeader">
        {moment(event.date).format("dddd, MMMM Do YYYY")}
        &nbsp;
        <Button className="buttonRight">
          <Link to={"/event-form/update/" + event.id}> Edit Event </Link>
        </Button>
        <Title level={2}>{event.eventName}</Title>
      </Header>
      <Divider />
      <Row justify="space-around">
        <Col span={10}>About: {event.description}</Col> 
        <Divider type="vertical" />
      
        <Col span={10}>
          <Row>
            <Col>
              Date: &nbsp;{moment(event.date).format("dddd, MMMM Do YYYY")}
              <br />
              Time:&nbsp;{moment(event.startTime).format("h:mm a")} - {moment(event.endTime).format("h:mm a")} &nbsp;
              <br />
              <Divider />
            </Col>
          </Row>
          <Row>
            <Col>
              Where: {event.location}
              <br />
              Address: {event.address}
              <a href={"https://maps.google.com/maps?hl=en" + event.location} target="_blank">
                map
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
