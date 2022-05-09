import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';


export default function M_Success({open, onClose}) {

    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC
    if(!open) return null

    return <div>
            <div className='wrapper'onClick={onClose}/>
            <div className='window'>
                <button className='closeBtn' onClick={onClose}>X</button>
                <p className='title'>La operación ha sido exitosa</p>
            </div>
        </div>
}
