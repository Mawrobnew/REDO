import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import { faFileArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function M_UploadDocsCommunityAttendance() {
    const [modalInfo, setModalInfo] = useState({})
    const [isOpen, setIsOpen] = useState(false)
    // updates the state on every change of the inputs or the selects
    const handleInputChange = (event) =>{
        const {name,value} = event.target
        setModalInfo({
            ...modalInfo,
            [name]:value
        })
    }

    //When the form is ready post the modal data to the backend and prevents the default behaviour of the form
    const handleSubmit = async (event) => {
        const result = await Request('POST', '/user', modalInfo)
        const {done} = result
        if (done) setIsOpen(!isOpen)
        event.preventDefault()
    }
    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC
    if (!isOpen) return (
        <button onClick={() => setIsOpen(true)} id='btnModalUploadDocs'><FontAwesomeIcon icon={faFileArchive} size='1x'/></button>
    )
    return (
        <div>
            <div className='wrapper' onClick={()=>{setIsOpen(false)}}/>
            <div className='window'>
                <button className='closeBtn' onClick={()=>{setIsOpen(false)}}>X</button>
                <p className='title'>Subir documentos</p>
                <form onSubmit={handleSubmit}>
                    <div className='formulario'>

                        <p>Lista de asistencia</p>
                        <input required type="file" id="" name="" accept=".pdf"/>
                        {/*Este es un campo nuevo, pero el endpoint lo recibe, solo que se me olvidó agregarlo*/}
                        <p>Asistencias</p>
                        <input required type='number' min='1'/>

                        <button className='aceptBtn'>Enviar</button>
                    </div>
                </form>
            </div>
        </div>)
}
