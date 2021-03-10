import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getSingleEvent, submitForm } from "./apiCall";
import { UserContext } from "../../App";
import { DatePicker, TimePicker, Form, Space, Input, Button, Row, Spin } from "antd";
import moment from "moment";
import { LoadingOutlined } from "@ant-design/icons";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const showSuccess = (responseMessage) => {
  return alert(responseMessage);
};

// console.log({responseMessage})
console.log({ submitForm });

const EventForm = () => {
  const [form] = Form.useForm();
  const [event, setEvent] = useState(undefined);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState(undefined);
  const { user } = useContext(UserContext);
  const { mode, id } = useParams();
  const history = useHistory();

  const [fields, setFields] = useState();

  useEffect(() => {
    if (mode === "update") {
      getSingleEvent(id, setEvent);
    }
  }, []);

  useEffect(() => {
    if (mode === "update") {
      form.setFieldsValue(event);
    }
  }, [event]);

  const { RangePicker } = TimePicker;
  // function startEndTime(time, timeString) {
  //   setFormValues({
  //     ...formValues,
  // startTime: moment(timeString[0]).format("h:mm"),
  // endTime: timeString[1],
  //   });
  //   console.log({ time, timeString });
  // }

  // console.log("response message", responseMessage);

  useEffect(() => {
    if (responseMessage !== undefined) showSuccess(responseMessage);
  }, [responseMessage]);

  return (
    <>
      <Form
        form={form}
        labelCol={{
          span: 4,
        }}
        wrapperCol={{
          span: 14,
        }}
        layout="horizontal"
        className="site-layout-content"
        fields={fields}
        onFieldsChange={(changedFields, allFields) => setFields(allFields)}
        onFinish={(event) => {
          submitForm(event, fields, setResponseMessage, user, history, mode, id, setLoading);
        }}>
        <h1 style={{ textAlign: "center" }}>Event Details</h1>
        <Form.Item label="Event Name:" name="eventName">
          <Input />
        </Form.Item>

        <Form.Item label="Location:" name="location">
          <Input />
        </Form.Item>

        <Form.Item label="Address: " name="address">
          <Input />
        </Form.Item>
        <Form.Item label="Description: " name="description">
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Time: " name="startEndTime">
          <RangePicker />
        </Form.Item>
        <Form.Item label="Date" name="date">
          <DatePicker />
        </Form.Item>
        <Form.Item>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
            {loading && <Spin indicator={antIcon} />}
              Submit
            </Button>
          </Row>
        </Form.Item>
      </Form>
    </>
  );
};

export default EventForm;
