import React, {useRef, useState} from 'react'
import {HOST, FileHost, Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import {faFileArchive} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import M_Fail from "./M_Fail";
import M_Success from "./M_Success";


export default function M_UploadDocuments() {
    const [isOpen, setIsOpen] = useState(false)
    const [petitionState, setPetitionState] = useState({
        successful: false,
        failed: false
    })

    const handleSubmit = async (event) => {
        event.preventDefault();
        const formData = new FormData();
        const inputFile = document.getElementById("archivo");
        for (const file of inputFile.files) {
            console.log(file)
            formData.append("archivo", file);
        }
        const response = await fetch("http://localhost:9000/", {
            method: "POST",
            body: formData,
            mode: 'cors'
        })
        const json = await response.json()
        console.log(response.status)
        if (response.status !== 200) {
            console.log("Errorrrr")
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
                <form onSubmit={handleSubmit} action={FileHost} target={HOST + '/trabajoSocial'} method='POST'
                      enctype='multipart/form-data'>
                    <div className='formulario'>
                        <p>Credencial</p>
                        <input type="file" required id="archivo" name="archivo" accept=".jpg, .jpeg, .png, .pdf"/>
                        <button className='aceptBtn'>Enviar</button>
                    </div>
                </form>
            </div>
            <M_Fail open={petitionState.failed} onClose={() => setPetitionState({...petitionState, failed: false})}/>
        </div>)
}
