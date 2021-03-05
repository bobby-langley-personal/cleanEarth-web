import React, { useState } from "react";
import { Modal, Button } from "antd";
import { List } from "antd";

function showSingleEvent(event, setEvents, setLoading) {
  fetch(
    "https://us-central1-cleanearth-api.cloudfunctions.net/app/events/" + event
  )
    .then((res) => res.json())
    .then((data) => {
      setEvents(data);
      console.log("data", data);
      setLoading(false);
    })
    .catch((e) => {
      console.log(e);
      setLoading(false);
    });
}

export default function EventDetails({ event, setEvents, setLoading }) {
  return (
    <>
      <div>test</div>
    </>
  );
}
