import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import { faUserXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/modal.css';


export default function M_DeleteUser({userInfo, deleteAction}) {
    const [isOpen, setIsOpen] = useState(false)
    if (!isOpen) return (
        <button onClick={() => setIsOpen(true)} id='btnModalDeleteUser'><FontAwesomeIcon icon={faUserXmark} size='1x'/></button>
    )

    const {name,id} = userInfo;
    //When the form is ready post the modal data to the backend and prevents the default behaviour of the form
    const handleSubmit = async (event) => {
        const result = await Request('DELETE', '/users', {id})
        const {done} = result
        if (done) setIsOpen(!isOpen)
        deleteAction(id)
    }

    return (
        <div>
            <div className='wrapper' onClick={()=>{setIsOpen(false)}}/>
            <div className='window'>
                <p className='title'>Eliminar usuario</p>
                    <div className='formulario'>
                        <p>Nombre</p>
                        <div>{name}</div>
                        <button className='yesBtn' onClick={handleSubmit}>Si</button>
                        <button className='noBtn' onClick={()=>{setIsOpen(false)}}>No</button>
                    </div>
            </div>
        </div>)
}
