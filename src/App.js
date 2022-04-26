import React, { useState } from 'react'
import './App.css';
import DataList from './component/Datalist.js';
import Menu from './component/Menu';
import M_InsertUser from "./component/M_InsertUser";
import M_Success from "./component/M_Success";
import M_Fail from "./component/M_Fail";

function App() {
  return (
      <div id='prueba'>
        <div id='cont_tabla'>
            <Menu/>
            <DataList/>
            <M_InsertUser/>
            <M_Success/>
            <M_Fail/>
        </div>
      </div>
  );
}

export default App;
