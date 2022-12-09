import { Collapse, Tabs, Row, Timeline, Col, Divider, Upload, Input, Mentions, Popconfirm, Space, Modal, Layout, Form } from 'antd';
import { ClockCircleOutlined, SmileOutlined, LoadingOutlined, SyncOutlined, UploadOutlined, DeleteOutlined, DownCircleOutlined } from '@ant-design/icons';
import { Avatar, Button, Comment, Anchor } from 'antd';
import { Card, List } from 'antd';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dangerouslySetInnerHTML from 'react';
import { USER_DATA_LINK, USER_ID, API_LINK, USER } from '../consts/consts';
import FormItem from 'antd/es/form/FormItem';
import reactStringReplace from "react-string-replace";
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Waitting from './waitting';
import Sider from 'antd/lib/layout/Sider';
import { CPYPTO } from './../consts/consts';
import hash from "object-hash";
import {DownloadOutlined } from "@ant-design/icons"
import { useTranslation } from 'react-i18next';

const { TextArea } = Input;
const { Panel } = Collapse;
const { Option, getMentions } = Mentions;
const { Link } = Anchor

axios.defaults.headers.post['Authorization'] = CPYPTO;
const DetailsBar = (props) => {
    const [loading, setLoading] = useState(false);
    const [task, setTask] = useState(null);
    const [comments, setComments] = useState([]);
    const [commentBody, setCommentBody] = useState("");
    const [fileList, setFileList] = useState([]);
    const [mentions, setMentions] = useState({});
    const {t} = useTranslation();
    

    const { id } = useParams();

    const downloadFile = async (id, name, type) => {
        const data = new FormData();
        data.append("id", id);
        data.append("type", type);
        await axios.post(API_LINK + "/api/file/get", data, { responseType: 'blob'}).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', name); //or any other extension
            document.body.appendChild(link);
            link.click();
            link.remove();
        });
    }


    useEffect(()=>{
        setTask(props.TASK)
    },[props.TASK])
   

   
    console.log("$task: ",props.TASK);

    return loading ? <Waitting /> : <>
        <Tabs defaultActiveKey="1">
            <Tabs.TabPane tab={t('task')} key="1">
                <Row>
                    <Col flex="1 1 200px">
                        <Card title="">{task?.description}</Card>
                        
                    </Col>
                    <Col flex="0 1 300px">
                        <div className="site-card-border-less-wrapper">
                            <Card style={{ marginTop: "15px" }} title={t('files')}>
                                {
                                    task?.files?.map(file => {
                                        return <div><a target={'_blank'} onClick={() => downloadFile(file.id, file.name, "task")}><DownloadOutlined />  &nbsp;{file.name}</a><br /></div>
                                    })
                                }
                            </Card>
                        </div>
                    </Col>
                </Row>
            </Tabs.TabPane>
           
        </Tabs>
    </>;
};
export default DetailsBar;