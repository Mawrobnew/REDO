import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import {faUserCheck} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../css/modal.css';
import M_Fail from "./M_Fail";
import M_Success from "./M_Success";


export default function M_ChangeStatus({beneficiaryInfo}) {
    const {name, id, status} = beneficiaryInfo
    const [modalInfo, setModalInfo] = useState(beneficiaryInfo)
    const [isOpen, setIsOpen] = useState(false)
    const [petitionState, setPetitionState] = useState({
        successful: false,
        failed: false
    })

    //When the form is ready post the modal data to the backend and prevents the default behaviour of the form
    const handleSubmit = async () => {
        const [, code] = await Request('PUT', '/beneficiaries', modalInfo)
        if (code === 200) {
            setIsOpen(false)
            setPetitionState({
                ...petitionState,
                successful: true
            })
            window.location.reload();
            return;
        }
        setPetitionState({
            ...petitionState,
            failed: true
        });
    }
    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC
    if (!isOpen) return (
        <div>
            <button onClick={() => setIsOpen(true)} id='btnModalChangeStatus'><FontAwesomeIcon icon={faUserCheck}
                                                                                               size='1x'/></button>
            <M_Success open={petitionState.successful}
                       onClose={() => setPetitionState({...petitionState, successful: false})}/>
        </div>
    )
    return (
        <div>
            <div className='wrapper' onClick={()=>{setIsOpen(false)}}/>
            <div className='window'>
                <p className='title'>Activar beneficiario</p>
                <div className='formulario'>
                    <p>Nombre</p>
                    <p>{name}</p>
                    <button className='yesBtn' onClick={handleSubmit}>Si</button>
                    <button className='noBtn' onClick={() => {
                        setIsOpen(false)
                    }}>No
                    </button>
                </div>
            </div>
            <M_Fail open={petitionState.failed} onClose={() => setPetitionState({...petitionState, failed: false})}/>
        </div>)
}
