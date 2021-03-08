import React from "react";
import { List, Button, Table, Tag, Space } from "antd";
import { Link } from "react-router-dom";
import { DeleteTwoTone } from "@ant-design/icons";
import EventDetails from '../event/eventDetailsPg'



export function deleteEvent(eventId, setLoading, setEvents) {
  setLoading(true)
  const API_URL = `https://us-central1-cleanearth-api.cloudfunctions.net/app/events/${eventId}`;
  const params = {
    method: "DELETE",
  };
  fetch(API_URL, params)
    .then((res) => res.json())
    .then((data) => {
      setEvents(data);
      setLoading(false)
    })
    .catch((err) => {
      console.log("error updating item: ", err);
      setLoading(false)
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

      render: (text, event) => (
        
        
            <a href={'/event/' + event.id} > {event.eventName} </a>
          

       
      )
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",

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
          <a>Invite </a>
          <Button onClick={() => deleteEvent(event.id, setLoading, setEvents)}>
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={events} />
      <Button> <Link to='/event-form' > create form </Link>
      </Button>

    </>
  );
}

export default EventList;
