import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { Button, Layout, Row, Col, Typography, Divider, Card, Image, Spin } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { PlusCircleTwoTone, DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Title } = Typography;
const { Header} = Layout;

function deleteEvent(userEvent, user, setUserEvents, setLoading) {
    {setLoading(true) && <Spin></Spin>}
  const API_URL = `https://us-central1-cleanearth-api.cloudfunctions.net/app/events/${user.uid}/${userEvent.id}`;
  const params = {
    method: "DELETE",
  };
  fetch(API_URL, params)
    .then((res) => res.json())
    .then((data) => {
      setUserEvents(data);
      setLoading(false)
    })
    .catch((err) => {
      console.log("error updating item: ", err);
      setLoading(false)
    });
}

function UserPage() {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(user);
    if (user) {
      setLoading(true);
      fetch("https://us-central1-cleanearth-api.cloudfunctions.net/app/events/" + user.uid )
        .then((res) => res.json())
        .then((data) => {
          setUserEvents(data);
          console.log("data", data);
          setLoading(false);
        })
        .catch((e) => {
          console.log(e);
          setLoading(false);
        });
    } else {
      setUserEvents([]);
      setLoading(false);
    }
  }, [user]);

  console.log({ userEvents });
  return (
    <div>
      <Header>
        <Image width={75} height={75} src="error" fallback={user.photoURL} alt="user photo" style={{ borderRadius: "50%", display: "flex" }}></Image>
      </Header>
      <Divider> Your Profile </Divider>
      <Row justify="space-around">
        <Col span={14}>
          <Title level={4}> {user.displayName}</Title> <br />
          Linked email: &nbsp; {user.email}
          <br />
        </Col>
        <Col span={8}>
          <br />
          <br />
          <Link style={{ fontSize: "18px" }} to={"/event-form/create"}>
            <PlusCircleTwoTone />
            Create New Event
          </Link>
        </Col>
        <Divider orientation="left"> Your Events </Divider>

        {userEvents.map((userEvent) => {
          console.log({ userEvent });
          return (
            <Col span={8}>
              <Card
                hoverable
                style={{ margin: "24px" }}
                key={userEvent.id}
                actions={[
                  <Button>
                    <Link to={"/event/" + userEvent.id}>
                      <EditOutlined />
                    </Link>
                  </Button>,
                  <Button   onClick={() => deleteEvent(userEvent, user, setUserEvents, setLoading)}>
                        <DeleteOutlined key="delete" /> 
                  </Button>,
                ]}
                title={<Link to={"/event/" + userEvent.id}>{userEvent.eventName}</Link>}
              >
                {moment(userEvent.date).format("dddd, MMMM Do YYYY")}
                {/* <Card.Item> {userEvent.date} </Card.Item> */}
              </Card>
            </Col>
          );
        })}
      </Row>
    </div>
  );
}

export default UserPage;
