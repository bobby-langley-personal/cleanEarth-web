import React, { useEffect, useState, useContext } from "react";
import { submitForm } from "./apiCall";
import { UserContext } from "../../App";
import { DatePicker, TimePicker, Form, Space, Input, Button } from "antd";

const showSuccess = (responseMessage) => {
  return alert(responseMessage);
};

// console.log({responseMessage})
console.log({submitForm})

const EventForm = () => {
  const { user } = useContext(UserContext);
  const [formValues, setFormValues] = useState({
    eventName: "",
    location: "",
    hostedBy: "",
    weather: "",
    address: "",
    date: "",
    startTime: "",
    endTime: "",
    description: "",
    userId: null,
    createdBy: null,
  });
  function dateNight(date, dateString) {
    setFormValues({ ...formValues, date: dateString });
    console.log({ date, dateString });
  }
  const { RangePicker } = TimePicker;
  function startEndTime(time, timeString) {
    setFormValues({ ...formValues, startTime: timeString[0], endTime: timeString[1] });
    console.log({ time, timeString });
  
  }

  const [componentSize, setComponentSize] = useState("default");

  const onFormLayoutChange = ({ size }) => {
    setComponentSize(size);
  };
  const [responseMessage, setResponseMessage] = useState(undefined);
  console.log("response message", responseMessage);

  useEffect(() => {
    if (responseMessage !== undefined) showSuccess(responseMessage);
  }, [responseMessage]);

  return (
    <>
      <h1>Create An Event</h1>

      <Form
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        initialValues={{
          size: componentSize,
        }}
        onValuesChange={onFormLayoutChange}
        size={componentSize}
        onFinish={(event) =>
          submitForm(event, formValues, setResponseMessage, user)
          
        }
      >
        <Form.Item label="Event Name:">
          <Input
            name="eventName"
            type="text"
            value={formValues.eventName}
            onChange={(e) =>
              setFormValues({ ...formValues, eventName: e.target.value })
            }
          />
        </Form.Item>

        <Form.Item label="Location:">
          <Input
            name="location"
            type="text"
            value={formValues.location}
            onChange={(e) =>
              setFormValues({ ...formValues, location: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Weather Forecast: ">
          <Input
            name="weather"
            type="text"
            value={formValues.weather}
            onChange={(e) =>
              setFormValues({ ...formValues, weather: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Address: ">
          <Input
            name="address"
            type="text"
            value={formValues.address}
            onChange={(e) =>
              setFormValues({ ...formValues, address: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item label="Description: ">
          <Input.TextArea
            name="description"
            type="text"
            value={formValues.description}
            onChange={(e) =>
              setFormValues({ ...formValues, description: e.target.value })
            }
          />
        </Form.Item>
        <Form.Item>
          <RangePicker label="StartEnd" onChange={startEndTime} />
        </Form.Item>
        <Form.Item label="Date">
          <DatePicker onChange={dateNight} />
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit"> 
        Submit 
        </Button>

          </Form.Item>
      </Form>
    </>
  );
};

export default EventForm;
