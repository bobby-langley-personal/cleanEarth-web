import React, { useEffect, useState, useContext } from "react";
import {
  Button,
  Layout,
  Row,
  Col,
  Typography,
  Divider,
  Popconfirm,
  message,
} from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { useHistory } from "react-router-dom";
import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { UserContext } from "../../App";
const { Content, Header, Sider } = Layout;
const { Title } = Typography;

function confirm(eventId, history) {
  deleteEvent(eventId, history);
  message.success("Event Deleted.");
}

function cancel(e) {
  console.log(e);
  message.error("Possibly a sound decision.");
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
      .catch((e) => {
        console.log(e);
        setLoading(false);
        console.log({ event });
      });

    console.log("this is event", event);
  }, []);

  return (
    <div>
      <Row justify="space-around">
        <Col span={10}>
          <h4 style={{ fontSize: "18px" }}>{moment(event.date).format("dddd, MMMM Do YYYY")}</h4>
          <h1 style={{ flexWrap: "wrap", fontSize: "42px" }}>{event.eventName}</h1>
        </Col>

        <div style={{ flexWrap: "nowrap" }}>
          <span style={{ fontSize: "20px", verticalAlign: "baseline"}}>Event By:</span>
          <span> &nbsp;
            <span style={{ fontSize: "20px", verticalAlign: "baseline" }}>{event.createdBy}</span>
          </span>
        </div>

        <Col span={6} style={{ text: "center" }}>
          <Button className="buttonRight" style={{ fontSize: "32px" }}>
            {(user && user.uid) === (event && event.userId) && (
              <Popconfirm
                title="Are you sure about that?"
                onConfirm={() => confirm(eventId, history)}
                onCancel={cancel}
                okText="Yes, delete event."
                cancelText="No, I'm not sure."
              >
                <DeleteTwoTone danger className="icon" />
              </Popconfirm>
            )}
          </Button>
          {(user && user.uid) === (event && event.userId) && (
            <Button className="buttonRight" style={{ fontSize: "32px" }}>
              <Link to={"/event-form/update/" + event.id}>
                <EditTwoTone className="icon" />
              </Link>
            </Button>
          )}
        </Col>
      </Row>

      <Divider />
      <Row justify="space-around">
        <Col span={10}>
          <h2>About:</h2>
          <p style={{ fontSize: "18px" }}>{event.description}</p>
        </Col>
        <Divider type="vertical" />
        <Col span={8}>
          <Row>
            <Col>
              <h3> Date: &nbsp;{moment(event.date).format("dddd, MMMM Do YYYY")} </h3>
              <br />
              <h3>
                Time:&nbsp;{event && event.startEndTime && moment(event.startEndTime[0]).format("hh:mm a")} -{" "}
                {event && event.startEndTime && moment(event.startEndTime[1]).format("h:mm a")} &nbsp;{" "}
              </h3>
              <br />
              <Divider />
            </Col>
          </Row>
          <Row>
            <Col>
              <h3>Where: {event.location}</h3>
              <br />
              <h3> Address: {event.address} </h3>
              <br />
              <a style={{ fontSize: "18px" }} href={"https://www.google.com/maps/search/?api=1&query=" + event.address} target="_blank">
                <img width={24} height={24} src="\google-maps.png"></img>
                See Event on Google Maps
              </a>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}