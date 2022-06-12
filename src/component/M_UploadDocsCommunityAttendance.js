import React, {useState} from 'react'
import {FormDataRequest} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import {faFileArchive} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import M_Fail from "./M_Fail";
import M_Success from "./M_Success";


export default function M_UploadDocsCommunityAttendance({idReport}) {
    const [isOpen, setIsOpen] = useState(false)
    const [petitionState, setPetitionState] = useState({
        successful: false,
        failed: false
    })

    const handleSubmit = async () => {
        const formData = new FormData();
        const inputFile = document.getElementById("archivo");
        const petitionNumber = document.getElementById("petitionNumber")
        for (const file of inputFile.files) {
            formData.append("file", file);
        }
        formData.append('Signatures', petitionNumber.value)
        formData.append('IdReport', idReport)
        const [, code] = await FormDataRequest('PUT', '/communityDocs', formData)
        if (code !== 200) {
            setPetitionState({
                ...petitionState,
                failed: true
            });
        }
        setIsOpen(false)
        setPetitionState({
            ...petitionState,
            successful: true
        })
        window.location.reload();
    }
    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC
    if (!isOpen) return (
        <div>
            <M_Success open={petitionState.successful}
                       onClose={() => setPetitionState({...petitionState, successful: false})}/>
            <button onClick={() => setIsOpen(true)} id='btnModalUploadDocs'><FontAwesomeIcon icon={faFileArchive}
                                                                                             size='1x'/></button>
        </div>
    )
    return (
        <div>
            <div className='wrapper' onClick={()=>{setIsOpen(false)}}/>
            <div className='window'>
                <button className='closeBtn' onClick={() => {
                    setIsOpen(false)
                }}>X
                </button>
                <p className='title'>Subir documentos</p>
                <div className='formulario'>
                    <p>Lista de asistencia</p>
                    <input required type="file" id="archivo" name="archivo" accept=".pdf"/>
                    <p>Asistencias</p>
                    <input required type='number' min='1' id="petitionNumber"/>
                    <button className='aceptBtn' onClick={handleSubmit}>Enviar</button>
                </div>
            </div>
            <M_Fail open={petitionState.failed} onClose={() => setPetitionState({...petitionState, failed: false})}/>
        </div>)
}
