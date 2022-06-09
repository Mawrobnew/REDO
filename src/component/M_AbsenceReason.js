import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import {faMagnifyingGlassPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ReasonSelect from "./API/ReasonSelect";
import M_Success from "./M_Success";
import M_Fail from "./M_Fail";

export default function M_AbsenceReason({absenseInfo}) {
    const [isOpen, setIsOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState(absenseInfo);
    const [renderHidden, setRenderHidden] = useState(false);
    const [petitionState, setPetitionState] = useState({
        successful: false,
        failed: false
    })
    const handleSubmit = async () => {
        const [json, code] = await Request('PUT', '/absences', modalInfo)
        console.log(json);
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
    // returns true if option with child "OTRO" is selected
    const OtherIsSelected = ({options, value}) => {
        return options[Number(value)].text === "OTROS"
    }
    const handleInputChange = (event) => {
        const {name, value, type} = event.target
        if (event.target.type === 'select-one') {
            if (OtherIsSelected(event.target))
                setRenderHidden(true);
            else //Erase the values from the otherSelect if needed
                setRenderHidden(false)
        }

        setModalInfo({
            ...modalInfo,
            [name]: value
        })
    }
    const OtherSelect = <div>
        <p>Otro</p>
        <input type='text' onChange={handleInputChange} name="textReason" placeholder={' ...'} maxLength={30}/>
    </div>
    const componentRendered = (renderHidden) ? OtherSelect : <td/>

    if (!isOpen) return (
        <div>
            <M_Success open={petitionState.successful}
                       onClose={() => setPetitionState({...petitionState, successful: false})}/>
            <button onClick={() => setIsOpen(true)} id='btnAbsenceReason'><FontAwesomeIcon icon={faMagnifyingGlassPlus}
                                                                                           size='1x'/></button>
        </div>
    )
    return (
        <div>
            <div className='wrapper' onClick={() => {
                setIsOpen(false)
            }}/>
            <div className='window'>
                <button className='closeBtn' onClick={() => {
                    setIsOpen(false)
                }}>X
                </button>
                <p className='title'>Descripción de falta</p>
                <div className='formulario'>
                    <p>Motivo</p>
                    <ReasonSelect name={'idReason'} id={1} onChange={handleInputChange}/>
                    {componentRendered}
                    <button className='aceptBtn' onClick={handleSubmit}>Guardar Motivo</button>
                </div>
            </div>
            <M_Fail open={petitionState.failed} onClose={() => setPetitionState({...petitionState, failed: false})}/>
        </div>)
}
