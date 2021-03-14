import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { List, Button, Table, Tag, Space, Layout, Row, Col, Typography, Divider, Card, Image } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";
import { PlusCircleTwoTone, DeleteOutlined, EditOutlined } from "@ant-design/icons";
const { Title } = Typography;
const { Content, Header, Sider } = Layout;

function UserPage() {
  const [userEvents, setUserEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  useEffect(() => {
    console.log(user);
    if (user) {
      setLoading(true);
      fetch("https://us-central1-cleanearth-api.cloudfunctions.net/app/events/" + user.uid)
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
  //   const card = {userEvents.map((userEvent)=>{
  //     return(
  //         <Card key={userEvent.id}
  //         title={eventName}
  //         >
  //             <p></p>
  //         </Card>
  //     )
  // }}
  console.log({ userEvents });
  return (
    <div>
      <Header>
        <Image width={75} height={75} src="error" fallback={user.photoURL} alt="user photo" style={{ borderRadius: "50%", display: "flex" }}></Image>
      </Header>
      <Divider> Your Profile </Divider>
      <Row justify="space-around">
        <Col >
          <Title  level={4}> {user.displayName} </Title> <br />
          Linked email: &nbsp; {user.email}
          <div className="buttonRight" float="right">
            <Link to={"/event-form/create"}>
              <PlusCircleTwoTone />
              Create New Event
            </Link>
          </div>
        </Col>
        <Divider orientation="left"> Your Events </Divider>

        {userEvents.map((userEvent) => {
          return (
            <Col span={8}>
              <Card
                hoverable
                style={{ margin: "24px" }}
                key={userEvent.id}
                actions={[<EditOutlined key="edit" />, <DeleteOutlined key="delete" />]}
                title={<Link to={"/event/" + userEvent.id}>{userEvent.eventName}</Link>}>
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
