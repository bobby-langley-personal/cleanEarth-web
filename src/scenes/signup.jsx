import React, { useContext, useState } from "react";
import firebase from "firebase";
import { useHistory } from "react-router-dom";
import {
  Form,
  Input,
  Button,
  Checkbox,
  Typography,
  Row,
  Col,
  Tooltip,
} from "antd";
import { GoogleOutlined } from "@ant-design/icons";
import { UserContext } from "../App";

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
const tooltip = (
  <span>Signing up with Google provides a more customized experience.</span>
);

const SignUp = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { setUser, firebaseAuth } = useContext(UserContext);
  let history = useHistory();

  const onFinish = ({ email, password }) => {
    firebaseAuth
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        setError(null);
        setUser(res.user);
        history.push("/");
      })
      .catch((err) => setError(err.message));
  };

  const loginWithGoogle = () => {
    setLoading(true);
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase
      .auth()
      .signInWithPopup(provider)
      .then((res) => {
        setError(null);
        setUser(res.user);
        console.log(res.user);
        setLoading(loading);
        history.push("/");
      })
      .catch((err) => setError(err.message));
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
    setError("Please input a valid email and password");
  };

  return (
    <Row justify="center">
      <Col span={10}>
        <Form
          {...layout}
          name="basic"
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email.",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: "Please input a password.",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item {...tailLayout} name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item {...tailLayout}>
            {error && (
              <>
                <Typography.Text type="danger">{error}</Typography.Text>
                <br />
                <br />
              </>
            )}

            <Button type="primary" htmlType="submit">
              <Tooltip placement="top" title={tooltip}>
                Sign Up
              </Tooltip>
            </Button>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button
              type="primary"
              icon={<GoogleOutlined />}
              loading={loading}
              onClick={() => loginWithGoogle()}
            >
              Sign up with Google
            </Button>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  );
};

export default SignUp;
