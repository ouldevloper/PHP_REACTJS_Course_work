import { CheckOutlined, ArrowRightOutlined, MessageOutlined, ArrowLeftOutlined, DownCircleOutlined } from '@ant-design/icons';
import { Rate, Button, PageHeader, Descriptions, Tag, Space, Modal, Input, notification } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import { useParams, useSearchParams, redirect } from 'react-router-dom';
import { type } from '@testing-library/user-event/dist/type';
import { USER_DATA_LINK, API_LINK, USER_ID, USER } from './../consts/consts';
import Waitting from './waitting';
import DetailsBar from './tabbar';
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

const Detail = (props) => {
  const [loading, setLoading] = useState(0);
  const [taskData, setTaskDate] = useState([]);
  let rateval = 0;
  let comment = "";
  let user_name = "";
  const { id } = useParams();
  const {t} = useTranslation();

  const fetch_data = async () => {
    setLoading(true);
    const data = new FormData();
    data.append("id", id);
    await axios.post(API_LINK + "/api/get", data).then(async (response) => {
      setTaskDate(response.data?.result);
    });
    setLoading(false);
  };

  useEffect(() => {
    fetch_data();
  }, []);

  const signDoc = async () => {
    const data = new FormData();
    data.append("id",id);
    await axios.post(API_LINK+"/api/signdoc",data).then(response=>{
      console.log(response.data);
    })

  }

  const allowToSign = taskData['isSigned']=="0" && taskData['role']!="specialist";
  return loading ? <Waitting /> : <><PageHeader
    ghost={false}
    className="site-page-header"
    onBack={() => window.history.back()}
    title={taskData['subject']}
    subTitle={<Space la size={10}>{t('priority')} <Tag color={colors[taskData['priority']]}>{t(tags[taskData['priority']])}</Tag></Space>}//"Priority : "+ +taskData['priority']}
    backIcon={<ArrowLeftOutlined />}
    extra={[
      allowToSign?<Button  key="2" icon={<ArrowRightOutlined />} onClick={signDoc}>{t('Sign Document')}</Button>:null,
    ]}
  >
    <DetailsBar TASK={taskData}  />
  </PageHeader>
  </>;
}

export default Detail;