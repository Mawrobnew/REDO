import React, { useState, useEffect} from 'react'
import './App.css';
import Menu from './component/Menu';
import T_User from "./component/T_User";
import T_GlobalBeneficiary from "./component/T_GlobalBeneficiary";
import T_BeneficiaryDocuments from "./component/T_BeneficiaryDocuments";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login"
import { useNavigate } from 'react-router-dom';
import T_Attendance from "./component/T_Attendance";
import T_CommunityAssistance from "./component/T_CommunityAssistance";
import T_Absence from "./component/T_Absence";

let MainPage = ()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        const token = sessionStorage.getItem("token")
        if(token === null) {
            navigate('/login')
        }
    },[])

    return <div>
        <Menu/>
        <T_User/>
        <T_GlobalBeneficiary/>
        <T_Attendance/>
        <T_CommunityAssistance/>
        <T_Absence/>
    </div>
}
function App() {
  return (
      <Router>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
          <Route exact path="/" element={<MainPage/>} />
      </Routes>
    </Router>
  );
}

export default App;
