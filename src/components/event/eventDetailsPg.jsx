import React, { useEffect, useState, useContext } from "react";
import { List, Button, Table, Tag, Space, Layout, Row, Col, Typography, Divider, Image, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { UserContext } from "../../App";
const { Content, Header, Sider } = Layout;
const { Title } = Typography;

function confirm(eventId, history) {
deleteEvent(eventId, history);
message.success('Click on Yes');
}

function cancel(e) {
  console.log(e);
  message.error('Click on No');
}

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
  const [favoritesList, setFavoritesList] = useState([]);
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
                  <Popconfirm
                  title="Are you sure to delete this task?"
                  onConfirm={()=>confirm(eventId, history)}
                  onCancel={cancel}
                  okText="Yes"
                  cancelText="No"
                >
                  <Link >
                    <DeleteTwoTone />
                  </Link>
                </Popconfirm>
                )}
              </Button>
              {(user && user.uid) === (event && event.userId) && (
                <Button className="buttonRight">
                  <Link to={"/event-form/update/" + event.id}>
                    <EditTwoTone />
                  </Link>
                </Button>
              )}
              {/* onClick={() => addToFavorites(event, favoritesList, setFavoritesList)}> <HeartTwoTone twoToneColor="#eb2f96" />  */}
            </div>
            <Row >
              <Col span={10}>
                <Title level={2}>{event.eventName}</Title>{" "}
              </Col>
              <Col span={10}>
                <Title level={5}>
                  Event By: <Image width={24} height={24} src="error" fallback={event && event.userPhoto} style={{ borderRadius: "50%" }}></Image>
                  {event.createdBy} 
                </Title>
              </Col>
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
                See Event on Google Maps
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}
