import React from "react";
import { List, Button, Table, Tag, Space, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";
import EventDetails from "../event/eventDetailsPg";
import moment from "moment";

export function deleteEvent(eventId, setLoading, setEvents) {
  setLoading(true);
  const API_URL = `https://us-central1-cleanearth-api.cloudfunctions.net/app/events/${eventId}`;
  const params = {
    method: "DELETE",
  };
  fetch(API_URL, params)
    .then((res) => res.json())
    .then((data) => {
      setEvents(data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("error updating item: ", err);
      setLoading(false);
    });
}

function EventList({ events, setEvents, setLoading }) {
  console.log("events in todo list", events);
  
  const columns = [
    {
      datasource: events,
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",

      render: (text, event) => <a href={"/event/" + event.id}> {event.eventName} </a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, event) =>  moment(event.date).format("MMMM, Do YYYY")
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      datasource: events,
      title: "Action",
      key: "action",

      render: (text, event) => (
        <Space size="middle">
          <Link>Invite </Link>
          <Button onClick={() => deleteEvent(event.id, setLoading, setEvents)}>Delete</Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Row justify="space-around">
        <Col span={20}>
          <Table columns={columns} dataSource={events} />
          
        </Col>
      </Row>
    </>
  );
}

export default EventList;
