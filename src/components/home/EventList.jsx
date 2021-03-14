import React, { useContext, useState } from "react";
import { List, Button, Table, Tag, Space, Row, Col, Typography, Image, Spin } from "antd";
import { Link, useHistory } from "react-router-dom";
import { DeleteTwoTone, MailOutlined } from "@ant-design/icons";
import EventDetails from "../event/eventDetailsPg";
import { UserContext } from "../../App";
import moment from "moment";
import { PlusCircleTwoTone } from "@ant-design/icons";
const {Title} = Typography

export function deleteEvent(eventId, setLoading, setEvents, history) {
  // setLoading(true)
  const API_URL = `https://us-central1-cleanearth-api.cloudfunctions.net/app/events/${eventId}`;
  const params = {
    method: "DELETE",
  };
  fetch(API_URL, params)
    .then((res) => res.json())
    .then((data) => {
      setEvents(data)
      // setLoading(false)
     return history.push("/user-events")
    })
    .catch((err) => {
      console.log("error updating item: ", err);
      // setLoading(false);
    });
}

function EventList({ events, setEvents, setLoading }) {
  const [favoritesList, setFavoritesList] = useState([]);
  let history = useHistory() 
  const { user } = useContext(UserContext);
  const columns = [
    {
      datasource: events,
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",

      render: (text, event) => <Link to={"/event/" + event.id}>  {event.eventName}</Link>,
      
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, event) => moment(event.date).format("MMMM, Do YYYY"),

      filterMultiple: false,
      onFilter: (value, record) => record.date.indexOf(value) === 0,
      defaultSortOrder: "ascend",
      sorter: (a, b) => moment(a.date) - moment(b.date),
      sortDirections: ["descend", "ascend"],
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Hosted By",
      dataIndex: "hostedBy",
      key: "hostedBy",
      filterMultiple: false,
      onFilter: (value, record) => record.hostedBy.indexOf(value) === 0,
      sorter: (a, b) => a.hostedBy.length - b.hostedBy.length,
      sortDirections: ['ascend'],
    },
    {
      datasource: events,
      title: "",
      key: "action",

      render: (text, event) => (
        <Space size="middle">
          <Link> <MailOutlined /> </Link>
          <Link to={"/event/" + event.id}> More </Link>
          
          {/* {user.uid === event.userId && <Button onClick={() => deleteEvent(event.id, setLoading, setEvents, history)}>Delete</Button>} */}
        </Space>
      ),
    },
  ];

  return (
    <>
    {/* {loading && <Spin indicator={antIcon} />} */}
      <Row justify="space-around">
        <Col span={20}>
          <Row style={{alignItems: "center"}}>
            <Col span={10}>
        <Title level={3}> &nbsp; All Events </Title>
        </Col> 
        <Col span={14}><Link style={{float: "right"}} to={"/event-form/create"}>
              <PlusCircleTwoTone />
              Create New Event
            </Link>
            </Col>
            </Row>
          <Table columns={columns} dataSource={events} />
        </Col>
      </Row>
    </>
  );
}

export default EventList;
