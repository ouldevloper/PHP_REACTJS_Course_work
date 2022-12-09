import { Col, Divider, Row, Skeleton, Space, Spin } from 'antd';
import React from 'react';
const hight = window.screen.height/3;
const DemoBox = (props) => <p className={`height-${props.value}`}>{props.children}</p>;
const Waitting = () =>
    <Row justify="space-around"  align="top" style={{
        padding:hight
    }}>
        <Col span={4}>
             <Spin size="large" />
        </Col>
    </Row>
export default Waitting;