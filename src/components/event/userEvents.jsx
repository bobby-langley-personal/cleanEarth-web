import React, {useState, useEffect, useContext} from "react";
import { List, Button, Table, Tag, Space, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";
import EventDetails from "./eventDetailsPg";
import { UserContext } from "../../App"
import moment from "moment";
import UserPage from "../../scenes/userPage";

export function deleteEvent(eventId, setLoading, setUserEvents) {
  setLoading(true);
  const API_URL = `https://us-central1-cleanearth-api.cloudfunctions.net/app/events/${eventId}`;
  const params = {
    method: "DELETE",
  };
  fetch(API_URL, params)
    .then((res) => res.json())
    .then((data) => {
      setUserEvents(data);
      setLoading(false);
    })
    .catch((err) => {
      console.log("error updating item: ", err);
      setLoading(false);
    });
}

function UserEventList() {
  
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(user)
    if (user) {
      setLoading(true);
      fetch("https://us-central1-cleanearth-api.cloudfunctions.net/app/events/"+ user.uid)
        .then((res) => res.json())
        .then((data) => {
          setUserEvents(data); console.log('data', data)
          setLoading(false);
        })
        .catch((e) => {
          console.log(e)
          setLoading(false)
        });
    } else {
      setUserEvents([]);
      setLoading(false);
    }
  }, [user]);
  console.log(userEvents)
 
  const columns = [
    {
      datasource: userEvents,
      title: "Event Name",
      dataIndex: "eventName",
      key: "eventName",

      render: (text, event) => <a href={"/event/" + event.id}> {event.eventName} </a>,
    },
    {
      title: "Date",
      dataIndex: "date",
      key: "date",
      render: (text, event) =>  moment(event.date).format("MMMM, Do YYYY"), 

      filterMultiple: false,
      onFilter: (value, record) => record.date.indexOf(value) === 0,
      defaultSortOrder: 'ascend',
      sorter: (a, b) => moment(a.date) - moment(b.date),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
    },
    {
      datasource: userEvents,
      title: "Action",
      key: "action",

      render: (text, event) => (
        <Space size="middle">
          <Link>Invite </Link>
         {user.uid === event.userId && <Button onClick={() => deleteEvent(event.id, setLoading, setUserEvents)}>Delete</Button>}
        </Space>
      ),
    },
  ];
  <UserPage userEvents={userEvents} setUserEvents={setUserEvents}
 />

  return (
    
      <Row justify="space-around">
        <Col span={20}>
          <Table columns={columns} dataSource={userEvents} />
          
        </Col>
      </Row>
    
  );
}

export default UserEventList;
