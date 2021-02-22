import React, {useContext, useState } from 'react'
import firebase from 'firebase'
import { useHistory } from "react-router-dom"
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import {GoogleOutlined} from '@ant-design/icons'
import {UserContext} from '../App'

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

const Login = () => {
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    const {setUser, firebaseAuth } = useContext(UserContext)
    let history = useHistory() 
    const onFinish = ({email, password}) => {
      firebaseAuth.signInWithEmailAndPassword(email, password)
        .then(res =>{
            setError(null)
            setUser(res.user)
            setLoading(false)
            history.push("/")  
        })
        .catch(err=> setError(err.message))
      };
      const loginWithGoogle = () => {
        setLoading(true)
        const provider = new firebase.auth.GoogleAuthProvider()
        firebase.auth().signInWithPopup(provider)
        .then(res =>{
            setError(null)
            setUser(res.user)
            console.log(res.user)
            setLoading(false)
            history.push("/")  
        })
        .catch(err=> {
          setLoading(false);
          setError(err.message)
      
      })
    }
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    setError('Please input a valid email and password')
  };

  return (
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
            message: 'Please input your username!',
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
            message: 'Please input your password!',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item {...tailLayout} name="remember" valuePropName="checked">
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item {...tailLayout}>
      
        <Button type="primary" htmlType="submit">
          Log In
        </Button>
        {error && <Typography.Text type="danger">{error}</Typography.Text>}
        
        </Form.Item> 
       <Form.Item {...tailLayout}>
        <Button
          type="primary"
          icon={< GoogleOutlined />}
          loading={loading}
          onClick={() => loginWithGoogle()}
        >
          Continue with Google
        </Button>
      </Form.Item>
    </Form>
  );
};



export default Login