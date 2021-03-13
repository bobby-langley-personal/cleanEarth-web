import React, { useEffect, useState, useContext } from "react";
import { List, Button, Table, Tag, Space, Layout, Row, Col, Typography, Divider, Image } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { UserContext } from "../../App";
const { Content, Header, Sider } = Layout;
const { Title } = Typography;

function deleteEvent(eventId, history) {
  const API_URL = `https://us-central1-cleanearth-api.cloudfunctions.net/app/events/${eventId}`;
  const params = {
    method: "DELETE",
  };
  fetch(API_URL, params)
    .then(() => history.push("/"))
    .catch((err) => {
      console.log("error updating item: ", err);
    });
}

export default function EventDetails(props) {
  const history = useHistory();
  const [event, setEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { eventId } = props.match.params;

  console.log(props.match.params.eventId);
  console.log("propsss", props.match.params.eventId);

  useEffect(() => {
    fetch("https://us-central1-cleanearth-api.cloudfunctions.net/app/event/" + eventId)
      .then((res) => res.json())
      .then((x) => setEvent(x))
      // setLoading(false)
      .catch((e) => {
        console.log(e);
        setLoading(false);
      });

    console.log("this is event", event);
  }, []);
  console.log(event.startTime);
  console.log({ user });
  console.log({ eventId });
  return (
    <div>
      <Row>
        <Col>
          <Header>
            {moment(event.date).format("dddd, MMMM Do YYYY")}
            <div className="buttonRight">
              <Button className="buttonRight">
                {(user && user.uid) === (event && event.userId) && (
                  <Link onClick={() => deleteEvent(eventId, history)}>
                    <DeleteTwoTone />
                  </Link>
                )}
              </Button>
              {(user && user.uid) === (event && event.userId) && (
                <Button className="buttonRight">
                  <Link to={"/event-form/update/" + event.id}>
                    <EditTwoTone />
                  </Link>
                </Button>
              )}
            </div>
            <Row justify= "center">
              <Title level={2}>{event.eventName}</Title>{" "}
              <Title level={5}>
                Event By:{" "}
                <Image
                  width={24}
                  height={24}
                  src="error"
                  fallback={event && event.userPhoto}
                  alt="user photo"
                  style={{ borderRadius: "50%" }}></Image>{" "}
                {event.createdBy}{" "}
              </Title>
            </Row>
          </Header>
        </Col>
      </Row>
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
              Address: {event.address} <br />
              <a href={"https://www.google.com/maps/search/?api=1&query=" + event.address} target="_blank">
                map
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
