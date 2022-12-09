import React from "react";

import { Button, Result } from 'antd';

const back = () => {
    window.history.back();
  };
const Error = ()=>{
    return <Result

    status="404"
    title="404"
    subTitle="Sorry, the page you visited does not exist."
    extra={<Button type="link" onClick={back}>Back Home</Button>}
  />
}

export default Error;