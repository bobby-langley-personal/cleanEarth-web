import React, { useEffect, useState, useContext } from "react";
import { submitForm } from "./apiCall";
import { UserContext } from "../../App";
import {DatePicker, Space} from 'antd'

const showSuccess = (responseMessage) => {
  return alert(responseMessage);
};


const EventForm = () => {
  const { user } = useContext(UserContext);
  const [formValues, setFormValues] = useState({
    eventName: "",
    eventDuration: 0,
    location: "",
    hostedBy: "",
    weather: "",
    date: "",
    description: "",
    userId: null,
    createdBy: null
  });
  function dateNight(date, dateString) {
    setFormValues({ ...formValues, date: dateString })
    console.log({date, dateString});
  }
  const [responseMessage, setResponseMessage] = useState(undefined);
  console.log("response message", responseMessage);

  useEffect(() => {
    if (responseMessage !== undefined) showSuccess(responseMessage);
  }, [responseMessage]);

  return (
    <>
      <h1>Create An Event</h1>
      <form
        onSubmit={(event) => submitForm(event, formValues, setResponseMessage, user)}
      >
        <label>Event Name: &nbsp;</label>
        <input
          name="eventName"
          type="text"
          value={formValues.eventName}
          onChange={(e) =>
            setFormValues({ ...formValues, eventName: e.target.value })
          }
        />
        <br />
        <label>Created By: &nbsp;</label>
        <input
          name="user Id"
          d
          type="text"
          value={formValues.createdBy}
          onChange={(e) =>
            setFormValues({ ...formValues, createdBy: e.target.value })
          }
        />
        <br />
        <label>Event Duration (hours): &nbsp;</label>
        <input
          name="eventDuration"
          type="number"
          value={formValues.eventDuration}
          onChange={(e) =>
            setFormValues({ ...formValues, eventDuration: e.target.value })
          }
        />
        <br/>
        <label>Location: &nbsp;</label>
        <input
          name="location"
          type="text"
          value={formValues.location}
          onChange={(e) =>
            setFormValues({ ...formValues, location: e.target.value })
          }
        />
        <br />
        <label>Hosted By: &nbsp;</label>
        <input
          name="hostedBy"
          type="text"
          value={formValues.hostedBy}
          onChange={(e) =>
            setFormValues({ ...formValues, hostedBy: e.target.value })
          }
        />
        <br />
        <label>Weather: &nbsp;</label>
        <input
          name="weather"
          type="text"
          value={formValues.weather}
          onChange={(e) =>
            setFormValues({ ...formValues, weather: e.target.value })
          }
        />
        <br />
        <label>Description: &nbsp;</label>
        <input
          name="description"
          type="text"
          value={formValues.description}
          onChange={(e) =>
            setFormValues({ ...formValues, description: e.target.value })
          }
        />
        <br/>
        <DatePicker onChange={dateNight}  /> <br/>
        <button type="submit"> Submit </button>
      </form>
    </>
  );
};

export default EventForm;
