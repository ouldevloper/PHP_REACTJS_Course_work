import { Button, Form, Input, Radio, notification, Spin } from 'antd';
import React, { useEffect, useState} from 'react';
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
const Frm = (props) => {
  const userID = localStorage.getItem("user_id");
  
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [priority, setPriority] = useState(1);
  const [pickerVal, setDatePicker] = useState(null);
  const [dateValue, setDateValue] = useState("0000-00-00");
  const [isTextIncluded, setTextIncluded] = useState(false);
  const [fileList, setFileList] = useState([]);
  const[options,setOptions] = useState([]);
  const {t} = useTranslation();
  const propsfiles = {
    onRemove: (file) => {
      const index = fileList.indexOf(file);
      const newFileList = fileList.slice();
      newFileList.splice(index, 1);
      setFileList(newFileList);
    },
    beforeUpload: (file) => {
      setFileList([...fileList, file]);
      return false;
    },
    fileList,
  };

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

  const onFinish = async (values) => {
    const usr = JSON.parse(localStorage.getItem("user_data"));
    const data = new FormData();
    data.append("user_id", usr?.id);
    for (var item in values) {
      data.append(item, values[item])
    }
    fileList.forEach((file) => {
      data.append('files[]', file);
    });
    await axios.post(API_LINK + "/api/new/instruction", data).then((response) => {
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

  const fetchTarget = async () => {
    const user_data = localStorage.getItem("user_data");
    console.log("user_Data : ",user_data);
    const user = JSON.parse(user_data);
    (async ()=>{
      const data = new FormData();
      data.append("role",user.role);
      await axios.post(API_LINK+"/api/gettarget",data).then(response=>{
        setOptions(response.data?.result?.map(item=>{
          return {
            value: item.id,
            label: item.fullname,
            key:   item.id
          };
        }));
      });
    })();
  }
  useEffect(()=>{
    (async ()=>{
      await fetchTarget();
    })();
  },[]);


  
  return (
      <Form
        form={form}
        onFinish={onFinish}
        {...formItemLayout}
        layout='horizontal'
      >
        <Form.Item key="1254" label={t('author')} name="target"  hasFeedback >
        <Select
          key="3256"
          onChange={null}
          options={options}
        />
        </Form.Item>
        <Form.Item label={t('priority')} defaultActiveKey={31} rules={[ { message:t('priority_required')  } ] } hasFeedback name="priority">
          <Radio.Group onChange={(key) => setPriority(key.target.value)} value={"1"} defaultActiveKey={"1"} defaultValue={"1"} required>
            <Radio.Button key={30} value="0">{t('low')}</Radio.Button>Tags
            <Radio.Button key={31} value="1">{t('middle')}</Radio.Button>
            <Radio.Button key={32} value="2">{t('hight')} </Radio.Button>
            <Radio.Button key={33} value="3">{t('critical')}</Radio.Button>
          </Radio.Group>
        </Form.Item>
        <Form.Item label={t('subject')} rules={[ { required: true, message:t('subject_required'),whitespace:true,type:"string" } ] } hasFeedback name="subject">
          <Input placeholder={t('subject')} required allowClear/>
        </Form.Item>
        <Form.Item label={t('description')} rules={[ { required: true,message:t('description_required'),whitespace:true,type:"string" } ] } hasFeedback name={'description'}>
          <Input.TextArea rows={6} maxLength={100} minLength={0} placeholder={t('description')}  allowClear required />
        </Form.Item>
        <Form.Item label={t('files_upload')}  >
          <Upload  {...propsfiles} >
            <Button icon={<UploadOutlined />}>{t('upload_files')}</Button>
          </Upload>
        </Form.Item>
        <Form.Item label=" ">
          <Collapse defaultActiveKey={['1']} >
            <Panel header={t('extra_options')} key="1">
              <Form.Item label={t('request_accept_text')} name="isAccoumpanyingText">
                <Switch onChange={onIsTextIncluded} />
              </Form.Item>
              <Form.Item label={t('period_of_execution')} >
                <Space direction="vertical" size={8}>
                  <DatePicker defaultValue={pickerVal} onChange={onDateChange} value={pickerVal} format={"YYYY-MM-DD"} />
                  <small style={{ color: "#a1b3c2" }}>{t('extra')}</small>
                </Space>
              </Form.Item>
            </Panel>
          </Collapse>
        </Form.Item>
        <Form.Item {...buttonItemLayout}>
          <Space size={10}><Button disabled={loading?true:false} onSubmit={onsubmit} type="primary" icon={<CheckOutlined />} htmlType="submit">{t('create_task')}</Button> {loading?<Spin indicator={<LoadingOutlined
            style={{
              fontSize: 24,
            }}
            spin
          />} />:null}</Space>
        </Form.Item>
      </Form>
  );
};
export default Frm;