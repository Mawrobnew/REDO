import React, { useState } from 'react'
import './App.css';
import DataList from './component/DataList';
import Menu from './component/Menu';
import Modal from './component/Modal';

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

            <Modal open={isOpen} onClose={() => setIsOpen(false)} ></Modal>
          </div>
        </>
        <div id='cont_tabla'>
          <Menu/>
          <DataList></DataList>
        </div>

      </div>


    

    </React.Fragment>

   
  );
}

export default App;
