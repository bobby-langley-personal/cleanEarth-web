import React, { useEffect, useState, useContext } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getSingleEvent, submitForm } from "./apiCall";
import { UserContext } from "../../App";
import { DatePicker, TimePicker, Form, Input, Button, Row, Spin, message } from "antd";
import { LoadingOutlined } from "@ant-design/icons";
import moment from "moment";
import Title from "antd/lib/typography/Title";

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;

const showSuccess = (responseMessage) => {
  return alert(responseMessage);
};
function disabledDate(current) {
  // Can not select days before today and today
  return current && current < moment().endOf("day");
}
const rangeConfig = {
  rules: [
    {
      type: "array",
      required: true,
      message: "Please select time.",
    },
  ],
};
const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 16,
  },
};

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
  }, [mode, id]);

  useEffect(() => {
    if (mode === "update") {
      const initEvent = {
        eventName: event && event.eventName,
        description: event && event.description,
        location: event && event.location,
        address: event && event.address,
        contactInfo: event && event.contactInfo,
        startEndTime: [event && moment(event.startEndTime[0]), event && moment(event.startEndTime[1])],
        date: event && moment(event.date),
        yourFullName: !user.displayName ? event && (event.yourFullName) : '',
      };

      form.setFieldsValue(initEvent);
    }
  }, [event]);

  const { RangePicker } = TimePicker;

  useEffect(() => {
    if (responseMessage !== undefined) showSuccess(responseMessage);
  }, [responseMessage]);

  return (
    <>
      <Form
        form={form}
        {...layout}
        title="test"
        layout="horizontal"
        className="site-layout-content"
        fields={fields}
        onFieldsChange={(changedFields, allFields) => setFields(allFields)}
        onFinish={(event) => {
          submitForm(event, fields, setResponseMessage, user, history, mode, id, setLoading);
        }}>
        <Title level={3} style={{ textAlign: "center" }}>
          Event Details
        </Title>
        <br />
        <Form.Item
          label="Event Name:"
          name="eventName"
          rules={[
            {
              required: true,
              message: "Please input event name",
            },
          ]}>
          <Input placeholder="e.g. Boca Beach Clean Up" />
        </Form.Item>

        <Form.Item
          label="Location:"
          name="location"
          rules={[
            {
              required: true,
              message: "Please input a valid location.",
            },
          ]}>
          <Input placeholder="e.g. Boca Code" />
        </Form.Item>

        <Form.Item
          label="Address: "
          name="address"
          rules={[
            {
              required: true,
              message: "Please input a valid address.",
            },
          ]}>
          <Input placeholder="e.g. 7035 Beracasa Way, Boca Raton, FL 33433" />
        </Form.Item>
        <Form.Item
          label="Contact: "
          name="contactInfo"
          rules={[
            {
              required: true,
              message: "Please add a contact for volunteers to connect with you.",
            },
          ]}>
          <Input placeholder="e.g. email@email.com / 561-867-5309" />
        </Form.Item>
        <Form.Item
          label="Description: "
          name="description"
          rules={[
            {
              required: true,
              message: "Please describe the event.",
            },
          ]}>
          <Input.TextArea  placeholder="Join us next weekend and lets make a difference... "/>
        </Form.Item>
        {!user.displayName && (
          <Form.Item
            label="Your Full Name: "
            name="yourFullName"
            rules={[
              {
                required: true,
                message: "Please provide your full name. ",
              },
            ]}>)
            <Input placeholder="John Doe"/>
          </Form.Item>
        )}
        <Form.Item label="Time: " name="startEndTime" rules={[
            {
              required: true,
              message: "Time required.",
            },
          ]}>
          <RangePicker format={["h:mm a", "h:mm a"]} />
        </Form.Item>
        <Form.Item
          label="Date"
          name="date"
          rules={[
            {
              required: true,
              message: "Please input a date.",
            },
          ]}>
          <DatePicker format={"MM-DD-YYYY"} {...rangeConfig} disabledDate={disabledDate} />
        </Form.Item>

        <Form.Item>
          <Row justify="end">
            <Button type="primary" htmlType="submit">
              Submit
              {loading && <Spin indicator={antIcon} />}
            </Button>
          </Row>
          <p id="formPrompt"></p> <br /> &nbsp;
        </Form.Item>
      </Form>
    </>
  );
};

export default EventForm;
