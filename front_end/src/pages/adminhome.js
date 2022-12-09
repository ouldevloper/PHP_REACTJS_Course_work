import { Button, PageHeader, Badge, ConfigProvider } from 'antd';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Tabs, Tag, Space, Table, Drawer } from 'antd';
import { Link } from 'react-router-dom';
import { CheckOutlined, ArrowRightOutlined, MenuUnfoldOutlined, ArrowLeftOutlined } from "@ant-design/icons";
import { API_LINK, USER_ID, USER_DATA_LINK, USER } from './../consts/consts';
import { Empty } from './Empty';
import Frm from './form';
import en from "../icons/en"; 
import ru from "../icons/ru"; 

import { useTranslation } from 'react-i18next';
import NewUser from './newuser';



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

const langIcons = {
  "ru": <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ru" viewBox="0 0 640 480" width="30" height="25">
  <g ffillRule="evenodd" strokeWidth="1pt">
  <path fill="#fff" d="M0 0h640v480H0z"/>
  <path fill="#0039a6" d="M0 160h640v320H0z"/>
  <path fill="#d52b1e" d="M0 320h640v160H0z"/>
  </g>
  </svg>,
  "en": <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-us" viewBox="0 0 640 480" width='30' height='25'>
  <g fillRule="evenodd">
      <g strokeWidth="1pt">
      <path fill="#bd3d44" d="M0 0h912v37H0zm0 73.9h912v37H0zm0 73.8h912v37H0zm0 73.8h912v37H0zm0 74h912v36.8H0zm0 73.7h912v37H0zM0 443h912V480H0z"/>
      <path fill="#fff" d="M0 37h912v36.9H0zm0 73.8h912v36.9H0zm0 73.8h912v37H0zm0 73.9h912v37H0zm0 73.8h912v37H0zm0 73.8h912v37H0z"/>
      </g> 
      <path fill="#192f5d" d="M0 0h364.8v258.5H0z"/>
      <path fill="#fff" d="m30.4 11 3.4 10.3h10.6l-8.6 6.3 3.3 10.3-8.7-6.4-8.6 6.3L25 27.6l-8.7-6.3h10.9zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.2 10.3-8.6-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.6zm60.8 0 3.3 10.3H166l-8.6 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.7-6.3h10.8zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.4-10.2-8.8-6.3h10.7zm60.8 0 3.3 10.3h10.7l-8.6 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zm60.8 0 3.3 10.3h10.8l-8.8 6.3 3.4 10.3-8.7-6.4-8.7 6.3 3.4-10.2-8.8-6.3h10.8zM60.8 37l3.3 10.2H75l-8.7 6.2 3.2 10.3-8.5-6.3-8.7 6.3 3.1-10.3-8.4-6.2h10.7zm60.8 0 3.4 10.2h10.7l-8.8 6.2 3.4 10.3-8.7-6.3-8.7 6.3 3.3-10.3-8.7-6.2h10.8zm60.8 0 3.3 10.2h10.8l-8.7 6.2 3.3 10.3-8.7-6.3-8.7 6.3 3.3-10.3-8.6-6.2H179zm60.8 0 3.4 10.2h10.7l-8.8 6.2 3.4 10.3-8.7-6.3-8.6 6.3 3.2-10.3-8.7-6.2H240zm60.8 0 3.3 10.2h10.8l-8.7 6.2 3.3 10.3-8.7-6.3-8.7 6.3 3.3-10.3-8.6-6.2h10.7zM30.4 62.6l3.4 10.4h10.6l-8.6 6.3 3.3 10.2-8.7-6.3-8.6 6.3L25 79.3 16.3 73h10.9zm60.8 0L94.5 73h10.8l-8.7 6.3 3.2 10.2-8.6-6.3-8.7 6.3 3.3-10.3-8.6-6.3h10.6zm60.8 0 3.3 10.3H166l-8.6 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.3-8.7-6.3h10.8zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.4-10.3-8.8-6.3h10.7zm60.8 0 3.3 10.3h10.7l-8.6 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.3-8.6-6.3h10.7zm60.8 0 3.3 10.3h10.8l-8.8 6.3 3.4 10.2-8.7-6.3-8.7 6.3 3.4-10.3-8.8-6.3h10.8zM60.8 88.6l3.3 10.2H75l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zm60.8 0 3.4 10.2h10.7l-8.8 6.3 3.4 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.7-6.3h10.8zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3H179zm60.8 0 3.4 10.2h10.7l-8.7 6.3 3.3 10.3-8.7-6.4-8.6 6.3 3.2-10.2-8.7-6.3H240zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zM30.4 114.5l3.4 10.2h10.6l-8.6 6.3 3.3 10.3-8.7-6.4-8.6 6.3L25 131l-8.7-6.3h10.9zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.2 10.2-8.6-6.3-8.7 6.3 3.3-10.2-8.6-6.3h10.6zm60.8 0 3.3 10.2H166l-8.6 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.7-6.3h10.8zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.4-10.2-8.8-6.3h10.7zm60.8 0 3.3 10.2h10.7L279 131l3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zm60.8 0 3.3 10.2h10.8l-8.8 6.3 3.4 10.3-8.7-6.4-8.7 6.3L329 131l-8.8-6.3h10.8zM60.8 140.3l3.3 10.3H75l-8.7 6.2 3.3 10.3-8.7-6.4-8.7 6.4 3.3-10.3-8.6-6.3h10.7zm60.8 0 3.4 10.3h10.7l-8.8 6.2 3.4 10.3-8.7-6.4-8.7 6.4 3.3-10.3-8.7-6.3h10.8zm60.8 0 3.3 10.3h10.8l-8.7 6.2 3.3 10.3-8.7-6.4-8.7 6.4 3.3-10.3-8.6-6.3H179zm60.8 0 3.4 10.3h10.7l-8.7 6.2 3.3 10.3-8.7-6.4-8.6 6.4 3.2-10.3-8.7-6.3H240zm60.8 0 3.3 10.3h10.8l-8.7 6.2 3.3 10.3-8.7-6.4-8.7 6.4 3.3-10.3-8.6-6.3h10.7zM30.4 166.1l3.4 10.3h10.6l-8.6 6.3 3.3 10.1-8.7-6.2-8.6 6.2 3.2-10.2-8.7-6.3h10.9zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.3 10.1-8.7-6.2-8.7 6.2 3.4-10.2-8.7-6.3h10.6zm60.8 0 3.3 10.3H166l-8.6 6.3 3.3 10.1-8.7-6.2-8.7 6.2 3.3-10.2-8.7-6.3h10.8zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.3 10.1-8.7-6.2-8.7 6.2 3.4-10.2-8.8-6.3h10.7zm60.8 0 3.3 10.3h10.7l-8.6 6.3 3.3 10.1-8.7-6.2-8.7 6.2 3.3-10.2-8.6-6.3h10.7zm60.8 0 3.3 10.3h10.8l-8.8 6.3 3.4 10.1-8.7-6.2-8.7 6.2 3.4-10.2-8.8-6.3h10.8zM60.8 192l3.3 10.2H75l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zm60.8 0 3.4 10.2h10.7l-8.8 6.3 3.4 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.7-6.3h10.8zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3H179zm60.8 0 3.4 10.2h10.7l-8.7 6.3 3.3 10.3-8.7-6.4-8.6 6.3 3.2-10.2-8.7-6.3H240zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zM30.4 217.9l3.4 10.2h10.6l-8.6 6.3 3.3 10.2-8.7-6.3-8.6 6.3 3.2-10.3-8.7-6.3h10.9zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.4-10.3-8.7-6.3h10.6zm60.8 0 3.3 10.2H166l-8.4 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.3-8.7-6.3h10.8zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.4-10.3-8.8-6.3h10.7zm60.8 0 3.3 10.2h10.7l-8.6 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.3-8.6-6.3h10.7zm60.8 0 3.3 10.2h10.8l-8.8 6.3 3.4 10.2-8.7-6.3-8.7 6.3 3.4-10.3-8.8-6.3h10.8z"/>
  </g>
  </svg>
}

const AdminHome = () => {
  const [drawerSize, setDrawerSize] = useState(window.innerWidth);
  const [selectedRow, setSelectedRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUser, setOpenUser] = useState(false);

  const [filter, setFilter] = useState(1);
  const [fullData,setFullData] = useState({instruction:[],user:[],archieve:[]});
  const {t,i18n} = useTranslation();




  const onClose = async () => {
    setOpen(false);
  };
  const showDrawer = () => {
    setOpen(true);
  };
  const onCloseUser = async () => {
    setOpenUser(false);
  };
  const showDrawerUser = () => {
    setOpenUser(true);
  };
  const columns = [
   
    {
      title: t('subject'),
      dataIndex: 'subject',
      
    },
    {
      title: 'description',
      dataIndex: 'description',
    },
    {
      title: t('priority'),
      dataIndex: 'priority',
      align: "center",
      render: (text, item) => {
        const color = colors[item.priority];
        const tag = tags[item.priority];
        return <Tag color={color} key={345}>{tag}</Tag>;
      }
    },
    {
      title: t('operation'),
      key: 'id',
      align: "center",
      render: (id) => {
        return <Space size="middle">
          <Link to={"/details/" + id.id} >{t('details')}</Link>
          {id.isSigned=="1"?<Tag color="green" key={123}>has been Signed</Tag>:<Tag color="red" key={123}>Not Signed</Tag>}
        </Space>
      },
    },
  ];
  const columns2 = [
   
    {
      title: t('Name'),
      dataIndex: 'fullname',
      
    },
    {
      title: 'email',
      dataIndex: 'email',
    },
    {
      title: t('role'),
      dataIndex: 'role',
      align: "center",
      render: (role) => {
        let color ='';// colors[rl];
        switch(role){
          case 'boss':       color = "red";break;
          case 'head':       color = "yellow";break;
          case 'specialist': color = "green";break;
        }
        console.log("clor: ",color);
        return <Tag color={color} key={123}>{t(role)}</Tag>;
      }
    },
    {
      title: t('operation'),
      key: 'id',
      align: "center",
      render: (id) => {
        return <Space size="middle">
          <Link to={"/details/" + id.id} >{t('details')}</Link>
        </Space>
      },
    },
  ];
  const data = [
    {
      "id":"1",
      "key":"1",
      "subject":"subkject",
      "priority":"3",
      "description":"description",
      "role":"boss"
    },
    {
      "id":"2",
      "key":"2",
      "subject":"subject",
      "priority":"1",
      "description":"description",
      "role":"boss"
    },
    {
      "id":"3",
      "key":"3",
      "subject":"subkject",
      "priority":"2",
      "description":"description",
      "role":"boss"
    },
  ];
  const data2 =[
    {
      "id":"1",
      "key":"11",
      "fullname":"Abdullah",
      "email":"abdo@mail.ru",
      "priority":"priority",
      "role":"boss"
    },
    {
      "id":"12",
      "key":"12",
      "fullname":"Abdullah",
      "email":"abdo@mail.ru",
      "priority":"priority",
      "role":"boss"
    },
    {
      "id":"13",
      "key":"13",
      "fullname":"Abdullah",
      "email":"abdo@mail.ru",
      "priority":"priority",
      "role":"boss"
    },
    
  ];
  const onTabChange = async (key) => {
    setFilter(key);
  }
  const redirect = async () => {
    
  }
  const handelAccept = async () => {
    
  }
  const Items = [
    {
      label:  <Space size={10}><>{t('users')}</><Badge count={fullData?.users?.length}>
      </Badge></Space> 
      ,
      key: "1",
      loading:true,
      children: <Empty><Table
        columns={columns2}
        dataSource={fullData?.users}
        rowSelection={{
          type: "checkbox",
          onChange: (keys) => {
            setSelectedRows(keys);
          },
          selectedRowKeys: selectedRow
        }}
      /></Empty>
    },
    {
      label: <Space size={10}><>{t('instruction')}</><Badge count={fullData?.instruction?.length}></Badge></Space>,
      key: "2",
      loading:true,
      children: <Empty><Table
        columns={columns}
        dataSource={fullData?.instruction}
        rowSelection={{
          type: "checkbox",
          onChange: (keys) => {
            setSelectedRows(keys);
          },
          onSelect: (record) => {
          },
          selectedRowKeys: selectedRow
        }}
      /></Empty>
    },
    {
      label: <Space size={10}><>{t('archieve')}</><Badge count={fullData?.archieve?.length}></Badge></Space>,
      key: "3",
      loading:true,
      children: <Empty><Table
        columns={columns}
        dataSource={fullData?.archieve}
        rowSelection={{
          type: "checkbox",
          onChange: (keys) => {
            setSelectedRows(keys);
          },
          onSelect: (record) => {
          },
          selectedRowKeys: selectedRow
        }}
      /></Empty>
    }
  ]
    const fetch = async ()=>{
      try{
        const user = JSON.parse(localStorage.getItem("user_data"))
        const data =  new FormData();
        data.append("id",user['id']??1);
        await axios.post(API_LINK+"/api/admin",data).then(response => {
            setFullData(response.data?.result);
        });  
      }catch(er){
        console.log("error: ",er);
      }
            
    }

    useEffect(()=>{
      (async()=>{
        await fetch();
      })();
    },[]);

  return (
    <div >
      <PageHeader
        style={{paddingLeft:5}}
        ghost={false}
        onBack={() => null}
        title={t('Boss Manager')}
        backIcon={<MenuUnfoldOutlined />}
        extra={[ <Button  style={{ color: "#2897f4", borderColor: "#2897f4" }} onClick={showDrawer} key={1} icon={<CheckOutlined />}>{t('take_to_work')} </Button> ,
                <Button  style={{ color: "#2897f4", borderColor: "#2897f4" }} onClick={showDrawerUser} key={1} icon={<CheckOutlined />}>{t('New User')} </Button>,
          <div className="dropdown">
           <Button style={{  borderColor: "#ffffff" }}   className='dropdown-toggle' id="dropdownMenuButton" data-toggle="dropdown" key={3} >
            {langIcons[i18n.language]}
           </Button>
          <div className="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
            <button  className='dropdown-item' onClick={() => i18n.changeLanguage('ru') }>
                <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-ru" viewBox="0 0 640 480" width="1em" height="1em">
                <g fillRule="evenodd" strokeWidth="1pt">
                <path fill="#fff" d="M0 0h640v480H0z"/>
                <path fill="#0039a6" d="M0 160h640v320H0z"/>
                <path fill="#d52b1e" d="M0 320h640v160H0z"/>
                </g>
                </svg> Русский
            </button>
            <button className='dropdown-item' onClick={() =>  i18n.changeLanguage('en') }>
             <svg xmlns="http://www.w3.org/2000/svg" id="flag-icons-us" viewBox="0 0 640 480" width='1em' height='1em'>
              <g fillRule="evenodd">
                  <g strokeWidth="1pt">
                  <path fill="#bd3d44" d="M0 0h912v37H0zm0 73.9h912v37H0zm0 73.8h912v37H0zm0 73.8h912v37H0zm0 74h912v36.8H0zm0 73.7h912v37H0zM0 443h912V480H0z"/>
                  <path fill="#fff" d="M0 37h912v36.9H0zm0 73.8h912v36.9H0zm0 73.8h912v37H0zm0 73.9h912v37H0zm0 73.8h912v37H0zm0 73.8h912v37H0z"/>
                  </g> 
                  <path fill="#192f5d" d="M0 0h364.8v258.5H0z"/>
                  <path fill="#fff" d="m30.4 11 3.4 10.3h10.6l-8.6 6.3 3.3 10.3-8.7-6.4-8.6 6.3L25 27.6l-8.7-6.3h10.9zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.2 10.3-8.6-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.6zm60.8 0 3.3 10.3H166l-8.6 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.7-6.3h10.8zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.4-10.2-8.8-6.3h10.7zm60.8 0 3.3 10.3h10.7l-8.6 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zm60.8 0 3.3 10.3h10.8l-8.8 6.3 3.4 10.3-8.7-6.4-8.7 6.3 3.4-10.2-8.8-6.3h10.8zM60.8 37l3.3 10.2H75l-8.7 6.2 3.2 10.3-8.5-6.3-8.7 6.3 3.1-10.3-8.4-6.2h10.7zm60.8 0 3.4 10.2h10.7l-8.8 6.2 3.4 10.3-8.7-6.3-8.7 6.3 3.3-10.3-8.7-6.2h10.8zm60.8 0 3.3 10.2h10.8l-8.7 6.2 3.3 10.3-8.7-6.3-8.7 6.3 3.3-10.3-8.6-6.2H179zm60.8 0 3.4 10.2h10.7l-8.8 6.2 3.4 10.3-8.7-6.3-8.6 6.3 3.2-10.3-8.7-6.2H240zm60.8 0 3.3 10.2h10.8l-8.7 6.2 3.3 10.3-8.7-6.3-8.7 6.3 3.3-10.3-8.6-6.2h10.7zM30.4 62.6l3.4 10.4h10.6l-8.6 6.3 3.3 10.2-8.7-6.3-8.6 6.3L25 79.3 16.3 73h10.9zm60.8 0L94.5 73h10.8l-8.7 6.3 3.2 10.2-8.6-6.3-8.7 6.3 3.3-10.3-8.6-6.3h10.6zm60.8 0 3.3 10.3H166l-8.6 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.3-8.7-6.3h10.8zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.4-10.3-8.8-6.3h10.7zm60.8 0 3.3 10.3h10.7l-8.6 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.3-8.6-6.3h10.7zm60.8 0 3.3 10.3h10.8l-8.8 6.3 3.4 10.2-8.7-6.3-8.7 6.3 3.4-10.3-8.8-6.3h10.8zM60.8 88.6l3.3 10.2H75l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zm60.8 0 3.4 10.2h10.7l-8.8 6.3 3.4 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.7-6.3h10.8zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3H179zm60.8 0 3.4 10.2h10.7l-8.7 6.3 3.3 10.3-8.7-6.4-8.6 6.3 3.2-10.2-8.7-6.3H240zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zM30.4 114.5l3.4 10.2h10.6l-8.6 6.3 3.3 10.3-8.7-6.4-8.6 6.3L25 131l-8.7-6.3h10.9zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.2 10.2-8.6-6.3-8.7 6.3 3.3-10.2-8.6-6.3h10.6zm60.8 0 3.3 10.2H166l-8.6 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.7-6.3h10.8zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.4-10.2-8.8-6.3h10.7zm60.8 0 3.3 10.2h10.7L279 131l3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zm60.8 0 3.3 10.2h10.8l-8.8 6.3 3.4 10.3-8.7-6.4-8.7 6.3L329 131l-8.8-6.3h10.8zM60.8 140.3l3.3 10.3H75l-8.7 6.2 3.3 10.3-8.7-6.4-8.7 6.4 3.3-10.3-8.6-6.3h10.7zm60.8 0 3.4 10.3h10.7l-8.8 6.2 3.4 10.3-8.7-6.4-8.7 6.4 3.3-10.3-8.7-6.3h10.8zm60.8 0 3.3 10.3h10.8l-8.7 6.2 3.3 10.3-8.7-6.4-8.7 6.4 3.3-10.3-8.6-6.3H179zm60.8 0 3.4 10.3h10.7l-8.7 6.2 3.3 10.3-8.7-6.4-8.6 6.4 3.2-10.3-8.7-6.3H240zm60.8 0 3.3 10.3h10.8l-8.7 6.2 3.3 10.3-8.7-6.4-8.7 6.4 3.3-10.3-8.6-6.3h10.7zM30.4 166.1l3.4 10.3h10.6l-8.6 6.3 3.3 10.1-8.7-6.2-8.6 6.2 3.2-10.2-8.7-6.3h10.9zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.3 10.1-8.7-6.2-8.7 6.2 3.4-10.2-8.7-6.3h10.6zm60.8 0 3.3 10.3H166l-8.6 6.3 3.3 10.1-8.7-6.2-8.7 6.2 3.3-10.2-8.7-6.3h10.8zm60.8 0 3.3 10.3h10.8l-8.7 6.3 3.3 10.1-8.7-6.2-8.7 6.2 3.4-10.2-8.8-6.3h10.7zm60.8 0 3.3 10.3h10.7l-8.6 6.3 3.3 10.1-8.7-6.2-8.7 6.2 3.3-10.2-8.6-6.3h10.7zm60.8 0 3.3 10.3h10.8l-8.8 6.3 3.4 10.1-8.7-6.2-8.7 6.2 3.4-10.2-8.8-6.3h10.8zM60.8 192l3.3 10.2H75l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zm60.8 0 3.4 10.2h10.7l-8.8 6.3 3.4 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.7-6.3h10.8zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3H179zm60.8 0 3.4 10.2h10.7l-8.7 6.3 3.3 10.3-8.7-6.4-8.6 6.3 3.2-10.2-8.7-6.3H240zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.3-8.7-6.4-8.7 6.3 3.3-10.2-8.6-6.3h10.7zM30.4 217.9l3.4 10.2h10.6l-8.6 6.3 3.3 10.2-8.7-6.3-8.6 6.3 3.2-10.3-8.7-6.3h10.9zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.4-10.3-8.7-6.3h10.6zm60.8 0 3.3 10.2H166l-8.4 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.3-8.7-6.3h10.8zm60.8 0 3.3 10.2h10.8l-8.7 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.4-10.3-8.8-6.3h10.7zm60.8 0 3.3 10.2h10.7l-8.6 6.3 3.3 10.2-8.7-6.3-8.7 6.3 3.3-10.3-8.6-6.3h10.7zm60.8 0 3.3 10.2h10.8l-8.8 6.3 3.4 10.2-8.7-6.3-8.7 6.3 3.4-10.3-8.8-6.3h10.8z"/>
              </g>
              </svg> English
            </button>
          </div>
          </div>
        ]}
      >
       <Tabs defaultActiveKey={filter} onChange={onTabChange} items={Items} />
         <Drawer
            width={drawerSize}
            placement="left"
            title={<Space size={10} ><strong>{t('back')}</strong><small>{t('New User')}</small></Space>}
            onClose={onCloseUser}
            open={openUser}
            icon={<ArrowLeftOutlined />}
            bodyStyle={{
              paddingBottom: 80,
            }}
          >
            <NewUser close={onClose} />
          </Drawer>
          <Drawer
            width={drawerSize}
            placement="left"
            title={<Space size={10} ><strong>{t('back')}</strong><small>{t('create_application')}</small></Space>}
            onClose={onClose}
            open={open}
            icon={<ArrowLeftOutlined />}
            bodyStyle={{
              paddingBottom: 80,
            }}
          >
            <Frm close={onClose} />
          </Drawer>
      </PageHeader>
    </div>);
}
export default AdminHome;