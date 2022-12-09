import React,{useEffect} from 'react';
import { Button, Checkbox, Col, Form, Input, Layout, Row, Space, Divider, Result } from 'antd';
import { type } from '@testing-library/user-event/dist/type';
import { json, Navigate } from 'react-router-dom';
import { API_LINK } from '../consts/consts';
import axios from 'axios';
import { browserHistory } from 'react-router'
const { Header, Footer, Sider, Content } = Layout;



const Login = () => {
    let $data = localStorage.getItem("user_data");
    try{
      $data = JSON.parse($data);
      if($data!==null){
        const path = "/"+$data?.role;
          return <Navigate  to={path} />;
      }
    }catch(error){}
   

  const onFinish = async (values) => {
    const config = {
      headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "*",
        "X-Requested-With": "XMLHttpRequest",
        "Access-Control-Allow-Methods" : "GET,POST,PUT,DELETE,OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With"

      }
    }
   const data =  new FormData();
   data.append("email",values.email);
   data.append("password",values.password);
    await axios.post(API_LINK+"/api/login",data,config).then(response=>{
      if(response.data?.result!=='error'){
        if(response.data.result&& response.data.result!=="error"){
          localStorage.setItem("user_data",JSON.stringify(response.data.result));
          const p = "/"+response.data?.result?.role;
          return <Navigate to={p} />
        }
        
      }
    });
  };

  const onFinishFailed = async (values) => {}







  return (
    <div style={{paddingTop:'300px'}}>
    <h1 align="center">курсовую работу | Login</h1>
    <Divider />
    <Row justify='space-around' align='middle' orientation="middle">
      <Col span={4}>
      <Form
      name="email"
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[
          {
            required: true,
            message: 'Please input your Email!',
          },
        ]}
      >
        <Input placeholder='Email' type='email' />
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
        <Input.Password placeholder='password' />
      </Form.Item>

      <Form.Item
        name="remember"
        valuePropName="checked"
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Checkbox>Remember me</Checkbox>
      </Form.Item>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type="primary" htmlType="submit">
          Sign in 
        </Button>
      </Form.Item>
    </Form>
      </Col>
    </Row>
    </div>
  );
};
export default Login;