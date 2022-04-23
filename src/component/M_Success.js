import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';


export default function M_Success() {
    const [isOpen, setIsOpen] = useState(false)

    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC
    if (!isOpen) return (
        <button onClick={() => setIsOpen(true)} id='btnModalInsertUser'>Success</button>
    )
    return (
        <div>
            <div className='wrapper'onClick={()=>{setIsOpen(false)}}/>
            <div className='window'>
                <button className='closeBtn' onClick={()=>{setIsOpen(false)}}>X</button>
                <p className='title'>La operación ha sido exitosa</p>
            </div>
        </div>)
}
