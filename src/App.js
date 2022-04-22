import React, { useState } from 'react'
import './App.css';
import DataList from './component/Datalist.js';
import Menu from './component/Menu';
import Modal from './component/Modal';
import M_InsertUsuario from './component/M_InsertUsuario';

const BUTTON_WRAPPER_STYLES = {
  position: 'relative',
  zIndex: 1
}

function App() {
  const [isOpen, setIsOpen] = useState(false)
  return (

    <React.Fragment>
      <div id='prueba'>
         <>
          <div style={BUTTON_WRAPPER_STYLES} onClick={() => console.log('clicked')} id='wrapper'>
            <button onClick={() => setIsOpen(true)} id='btnModalunUser'>Open Modal</button>
            <Modal open={isOpen} onClose={() => setIsOpen(false)} />
            <hr></hr>
          </div>
        </>
        <M_InsertUsuario></M_InsertUsuario>
        <div id='cont_tabla'>
          <Menu/>
          <DataList/>
        </div>

      </div>
    </React.Fragment>
  );
}

export default App;
