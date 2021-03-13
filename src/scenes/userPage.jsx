import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../App";
import { List, Button, Table, Tag, Space, Layout, Row, Col, Typography, Divider, Card, Image } from "antd";
import { Link } from "react-router-dom"
import moment from 'moment'
const {Title} = Typography
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
      <Divider > Your Profile </Divider>
      <Row justify="space-around">
        <Col span={18}>
         <Title level={4}> {user.displayName} </Title> <br/> 
          Linked email address:         {user.email}
          <div className="buttonRight">
              <Link to={"/event-form/create"}>Create New Event</Link>

          </div>
        </Col>
        <Divider orientation="left" > Your Events </Divider>
        
            
          {userEvents.map((userEvent) => {
            return (
                <Col span={8}>
              <Card hoverable style={{ margin: "24px" }} key={userEvent.id} title={<Link to={"/event/" + userEvent.id}>{userEvent.eventName}</Link>}>
              {moment(userEvent.date).format("dddd, MMMM Do YYYY")}
              </Card>
              </Col>
            );
          })}
        

       
      </Row>
    </div>
  );
}

export default UserPage;
