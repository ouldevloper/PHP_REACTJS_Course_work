
import React ,{useEffect}from 'react';
import 'antd/dist/antd.min.css';
import { Routes, Route } from "react-router-dom";
import Error from './pages/error';
import AdminHome from './pages/adminhome';
import Detail from './pages/details';
import UserHome from './pages/userhome';
import UserDetais from "./pages/usertetails";
import Login from './pages/login';
import HeadHome from './pages/headhome';



function App() {

  return (
    
      <Routes>
        <Route path="/login"         exact element={<Login />}/>
        <Route path="/boss"          exact element={<AdminHome />}/>
        <Route path="/admin"         exact element={<AdminHome />}/>
        <Route path="/head"          exact element={<HeadHome />}/>
        <Route path="/user"          exact element={<UserHome/>}/>
        <Route path="/details/:id"   exact element={<Detail />} /> 
        <Route path="/user/*"        exact element={<UserHome/>}/>
        <Route path="/task/:id"      exact element={<UserDetais/>}/>
        <Route path="/*"             element={<Error/>} />
      </Routes>
  );
}
export default App;
