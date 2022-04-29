import React, { useState } from 'react'
import './App.css';
import Menu from './component/Menu';
import T_User from "./component/T_User";
import T_GlobalBeneficiary from "./component/T_GlobalBeneficiary";
import T_BeneficiaryDocuments from "./component/T_BeneficiaryDocuments";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login"

function App() {
    let MainPage = ()=>(
        <div>
            <Menu/>
            <T_User/>
            <T_GlobalBeneficiary/>
            <T_BeneficiaryDocuments/>
        </div>
    )
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
