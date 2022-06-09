import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import {faMagnifyingGlassPlus} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ReasonSelect from "./API/ReasonSelect";

export default function M_AbsenceReason() {
    const [isOpen, setIsOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState();
    const [renderHidden, setRenderHidden] = useState(false);
    const handleSubmit = async () => {
        const [json, code] = await Request('POST', '/user', modalInfo)
    }
    // returns true if option with child "OTRO" is selected
    const OtherIsSelected = ({options, value}) => {
        return options[Number(value)].text === "OTROS"
    }
    const handleInputChange = (event) => {
        const {name, value} = event.target
        if (OtherIsSelected(event.target))
            setRenderHidden(true);
        else //Erase the values from the otherSelect if needed
            setRenderHidden(false)

        setModalInfo({
            ...modalInfo,
            [name]: value
        })
    }
    const OtherSelect = <div>
        <p>Otro</p>
        <input type='text' onChange={handleInputChange} name="" placeholder={' ...'} maxLength={30}/>
    </div>
    const componentRendered = (renderHidden) ? OtherSelect : <td/>

    if (!isOpen) return (
        <button onClick={() => setIsOpen(true)} id='btnAbsenceReason'><FontAwesomeIcon icon={faMagnifyingGlassPlus}
                                                                                       size='1x'/></button>
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
                <form onSubmit={handleSubmit}>
                    <div className='formulario'>
                        <p>Motivo</p>
                        <ReasonSelect name={'somename'} id={1} onChange={handleInputChange}/>
                        {componentRendered}
                        <button className='aceptBtn'>Crear comunidad</button>
                    </div>
                </form>
            </div>
        </div>)
}
