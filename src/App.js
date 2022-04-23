import React, { useState } from 'react'
import './App.css';
import DataList from './component/Datalist.js';
import Menu from './component/Menu';
import Modal from './component/Modal';
import M_InsertUser from "./component/M_InsertUser";
import M_Success from "./component/M_Success";
import M_Fail from "./component/M_Fail";

const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (
      <div id='prueba'>
          <hr></hr>
        <div id='cont_tabla'>
            <Menu/>
            <DataList/>
            <M_InsertUser/>
            <M_Success/>
            <M_Fail/>
        </div>

      </div>
    </React.Fragment>
  );
}

export default App;
