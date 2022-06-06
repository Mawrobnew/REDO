import {useState} from 'react'
import {FormDataRequest} from "../utils/WebRequestMiddleware";
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
        const formData = new FormData();
        const inputFile = document.getElementById("archivo");
        for (const file of inputFile.files) {
            formData.append("file", file);
        }
        const [, code] = await FormDataRequest('POST', '/beneficiaryDoc', formData)
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
                        <p>Credencial</p>
                        <input type="file" required id="archivo" name="archivo" accept=".jpg, .jpeg, .png, .pdf"/>
                        <button className='aceptBtn' onClick={handleSubmit}>Enviar</button>
                    </div>
            </div>
            <M_Fail open={petitionState.failed} onClose={() => setPetitionState({...petitionState, failed: false})}/>
        </div>)
}
