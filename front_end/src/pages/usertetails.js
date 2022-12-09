import { ArrowRightOutlined, ArrowLeftOutlined, DownCircleOutlined,QuestionOutlined } from '@ant-design/icons';
import { Rate, Button, PageHeader, Tag, Space, Modal, Input, Popconfirm } from 'antd';

import React, { useEffect, useState } from 'react';
import DetailsBar from './tabbar';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { API_LINK, USER_ID, USER_DATA_LINK, USER } from './../consts/consts';
import Error from './error';
import Waitting from './waitting';
import Title from 'antd/lib/skeleton/Title';
import { useTranslation } from 'react-i18next';

const colors = {
  0: "blue",
  1: "green",
  2: "yellow",
  3: "red"
};
const tags = {
  0: "low",
  1: "middle",
  2: "hight",
  3: "critical"
}

const UserDetails = (props) => {
  const [loading, setLoading] = useState(false);
  const [taskData, setTaskDate] = useState([]);
  let rateval = 0;
  let comment = "";
  const {t} = useTranslation();

  const { id } = useParams();


  const fetch_data = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("id", id);
    data.append("user_name",USER.NAME + " " + USER.SECOND_NAME + " " + USER.LAST_NAME);
    data.append("user_id",USER_ID);
    await axios.post(API_LINK + "/api/task/details", data).then(async (response) => {
      setTaskDate(response.data);
    });
    setLoading(false);
  };

  useEffect(() => {
    fetch_data();
  }, []);
  const onOk = () => {
    setLoading(true);
    const formdata = new FormData();
    formdata.append("comment", comment);
    formdata.append("rate", rateval);
    formdata.append("user_id", USER_ID);
    formdata.append("task_id", taskData['id']);
    axios.post(API_LINK + "/api/feedback/new", formdata);
    setLoading(false);
  }
 

  const confirmTask = async () => {
    setLoading(true);
    const formdata = new FormData();
    const task_id = taskData['id'];
    formdata.append("task_id", task_id);
    await axios.post(API_LINK + "/api/task/confirm", formdata).then(async (resposne) => {
      Modal.confirm({
        destroyOnClose: true,
        title: t('task_done'),
        icon: <DownCircleOutlined />,
        onOk() {
          onOk();
        },

        content: (
          <div style={{alignContent:"center"}}>
            <center><h5>{t('rate_task')}</h5>
            <Space align='center'>
            <Rate defaultValue={0} onChange={(e) => { rateval = e }} />
            </Space>
            </center>
            <span></span>
            <Input.TextArea onChange={(e) => { comment = e.target.value }} name="comment" placeholder={t('placeholder_feedback')} />
          </div>
        ),


      });
      setLoading(false);
      await fetch_data();
    });

  }

  const rejectTask = async ()=>{
    
      Modal.warning({
        destroyOnClose: true,
        title: t('rejection_reason'),
        icon: <QuestionOutlined />,
        cancelText:null,
        async onOk() {
          setLoading(true);
          const formdata = new FormData();
          const task_id = taskData['id'];
          formdata.append("task_id", task_id);
          formdata.append("user_id", USER_ID);
          formdata.append("user_avatar", USER.PERSONAL_PHOTO);
          formdata.append("body", comment);
          formdata.append("user_name",USER.NAME+" "+USER.LAST_NAME+ " "+USER.SECOND_NAME );
          const res = await axios.post(API_LINK + "/api/comment/add", formdata).then(res => res.data);
          if(res.Result=="Success"){
            await axios.post(API_LINK + "/api/task/undone", formdata);
          }
          await fetch_data();
          setLoading(false);
        },
        content: (
          <div style={{alignContent:"center"}}>

            <Input.TextArea onChange={(e) => { comment = e.target.value }} name="comment" placeholder={t('placeholder_feedback')} required/>
          </div>
        )});
  }

  const isAllowedConfirm = taskData?.isDone == "1" && taskData?.isConfirmed == "0";
  return loading?<Waitting/>:
  <><PageHeader
    ghost={false}
    className="site-page-header"
    onBack={() => window.history.back()}
    title={taskData?.subject}
    subTitle={<Space la size={10}>{t('priority')} <Tag color={colors[taskData?.priority]}>{t(tags[taskData?.priority])}</Tag></Space>} //"Priority : "+ +taskData['priority']}
    backIcon={<ArrowLeftOutlined />}
    extra={[
      isAllowedConfirm ?<Popconfirm icon={null} placement="bottomRight"  okText={t('accept')} cancelText={t('cancel')} onConfirm={confirmTask} onCancel={rejectTask}>
           <Button key="1" icon={<ArrowRightOutlined />}  type="primary">{t('confirm')}</Button>
      </Popconfirm> : <></>,
    ]}
  >
    <DetailsBar TASK={taskData} />
  </PageHeader></>;
}



export default UserDetails;
//