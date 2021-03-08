import React, { useEffect, useState } from "react";
import { List, Button, Table, Tag, Space } from "antd";
import { Link } from "react-router-dom";



export default function EventDetails(props) {
  const [event, setEvent] = useState([])
  // const {eventId} = props.match.params.eventId

  console.log(props.match.params.eventId)
  console.log("propsss", props.match.params.eventId)

  useEffect(() => {
    fetch(
      "https://us-central1-cleanearth-api.cloudfunctions.net/app/event/" + props.match.params.eventId
    )
      .then((res) => res.json())
      .then((x) => setEvent(x))

      .catch((e) => {
        console.log(e);
        // setLoading(false);
      });

      console.log('this is event', event)
  }, [])



  


  return (
    <div> 
      {event.eventName}
    </div>
  );
}
