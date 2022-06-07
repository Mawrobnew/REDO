import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import {faUserCheck} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../css/modal.css';
import M_Success from "./M_Success";
import M_Fail from "./M_Fail";


export default function M_BeneficiaryAttendance({BeneficiaryInfo}) {
    const {Nombre, Asistencia, Folio} = BeneficiaryInfo
    const [modalInfo, setModalInfo] = useState(BeneficiaryInfo)
    const [isOpen, setIsOpen] = useState(false)
    const [petitionState, setPetitionState] = useState({
        successful: false,
        failed: false
    })
    if (!isOpen) return (
        <div>
            <button onClick={() => setIsOpen(true)} id='btnModalAttendance'><FontAwesomeIcon icon={faUserCheck}
                                                                                             size='1x'/></button>
            <M_Success open={petitionState.successful}
                       onClose={() => setPetitionState({...petitionState, successful: false})}/>
        </div>
    )
    const toggleAttendance = () => {
        // 1 Create attendance 0 Remove attendance
        return (Asistencia === 'Si') ? 0 : 1; //If there is attendance remove
    }
    const handleSubmit = async () => {
        const requestData = {folio: Folio, attendance: toggleAttendance()}
        const [, code] = await Request('POST', '/attendance', requestData)
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
    return (
        <div>
            <div className='wrapper' onClick={() => {
                setIsOpen(false)
            }}/>
            <div className='window'>
                <p className='title'>Asistencia</p>
                <div className='formulario'>
                    <p>Nombre</p>
                    <p>{Nombre}</p>
                    <p>Asistencia</p>
                    <p>{Asistencia}</p>
                    <button className='yesBtn' onClick={handleSubmit}>Cambiar</button>
                </div>
            </div>
            <M_Fail open={petitionState.failed} onClose={() => setPetitionState({...petitionState, failed: false})}/>
        </div>)
}
