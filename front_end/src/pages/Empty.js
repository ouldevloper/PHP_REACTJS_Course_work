
import { ConfigProvider } from 'antd';
import {FrownOutlined} from '@ant-design/icons';
import { useTranslation } from 'react-i18next';
const customizeRenderEmpty = () => {
 
  return   <div
    style={{
      textAlign: 'center',
    }}
  >
    <FrownOutlined  
      style={{
        fontSize: 30,
      }}
    />
  </div>;
};
export const Empty =(props)=>{
    return <ConfigProvider renderEmpty={customizeRenderEmpty}>
        {props.children}
    </ConfigProvider>
}