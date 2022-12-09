import { Button, Form, Input, Radio, notification, Spin } from 'antd';
import React, { useState,useEffect} from 'react';
import { UploadOutlined, CheckOutlined } from '@ant-design/icons';
import { Collapse, Switch, DatePicker, Space } from 'antd';
import { Upload,Select } from 'antd';
import {LoadingOutlined} from '@ant-design/icons';
import axios from 'axios';
import { USER, USER_ID } from '../consts/consts';
import { API_LINK } from '../consts/consts';
import Waitting from './waitting';
import { useTranslation } from 'react-i18next';

const { Panel } = Collapse;
const NewUser = (props) => {
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [priority, setPriority] = useState(1);
  const [pickerVal, setDatePicker] = useState(null);
  const [dateValue, setDateValue] = useState("0000-00-00");
  const [isTextIncluded, setTextIncluded] = useState(false);
  const [fileList, setFileList] = useState([]);
  const {t} = useTranslation();
  const [boss,setBoss] = useState([]);
  const [options,setOptions] = useState([]);
  const [b,setb] = useState();

  const onIsTextIncluded = (checked) => {
    setTextIncluded(checked);
  }

  const onDateChange = (dt, dateVal) => {
    setDateValue(dateVal);
    setDatePicker(dt);
  }

  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 14 },
  };

  const buttonItemLayout = {
    wrapperCol: { span: 14, offset: 4 },
  };

  const fitchBossS = async () => {
    await axios.post(API_LINK + "/api/getboss").then((response) => {
      setBoss(response.data?.result);
    });
  } 

  useEffect (()=>{
    (async ()=>{
      await fitchBossS();
    })();
  },[]);
  useEffect(()=>{
    console.log(boss,typeof(boss)); 
    setOptions(boss?.map((item)=>{
      return {
        value: item.id,
        label: item.fullname,
      }
    }));
  },[boss]);

  const onFinish = async (values) => {
    setLoading(true);
    const data = new FormData();
    for (var item in values) {
      data.append(item, values[item])
    }
    data.append("boss",b);
    await axios.post(API_LINK + "/api/makeuser", data).then((response) => {
      if (response.data) {
        if (response.data['result'] == "success") {
          notification["success"]({
            message: t('op_success'),
          });
          form.resetFields()
          props.close();

        } else {
          notification["error"]({
            message: t('op_failed'),
          });
        }
      }

    });
    setLoading(false);
  }


  const handelBoss = (value)=>{
    setb(value);
  }
  return (
      <Form
        form={form}
        onFinish={onFinish}
        {...formItemLayout}
        layout='horizontal'
      >
        <Form.Item label={t('boss')} name="boss"  >
          <Select
            onChange={handelBoss}
            options={options}
          />
        </Form.Item>
        <Form.Item label={t('role')} defaultActiveKey={32} rules={[ { message:t('role_required'),required:true  } ] } hasFeedback name="role">
          <Radio.Group onChange={(key) => setPriority(key.target.value)} value={"1"} defaultActiveKey={"1"} defaultValue={"1"} required>
            <Radio.Button key={30} value="boss">{t('boss')}</Radio.Button>Tags
            <Radio.Button key={31} value="head">{t('head')}</Radio.Button>
            <Radio.Button key={32} value="specialist" selected>{t('specialist')}</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t('fullname')} rules={[ { required: true, message:t('fullname_required'),whitespace:true,type:"string" } ] } hasFeedback name="fullname">
          <Input placeholder={t('fullname')} required allowClear/>
        </Form.Item>

        <Form.Item label={t('email')} rules={[ { required: true, message:t('email_required'),whitespace:true,type:"string" } ] } hasFeedback name="email">
          <Input placeholder={t('email')} required allowClear/>
        </Form.Item>

        <Form.Item label={t('password')} rules={[ { required: true, message:t('password_required'),whitespace:true,type:"string" } ] } hasFeedback name="password">
          <Input placeholder={t('password')} required allowClear type='password'/>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Space size={10}><Button disabled={loading?true:false} onSubmit={onsubmit} type="primary" icon={<CheckOutlined />} htmlType="submit">{t('create_user')}</Button> {loading?<Spin indicator={<LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />} />:null}</Space>
        </Form.Item>
      </Form>
  );
};
export default NewUser;