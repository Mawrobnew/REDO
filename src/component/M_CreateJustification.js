import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import {faClipboard} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ReasonSelect from "./API/ReasonSelect";

export default function M_CreateJustification() {
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
        <button onClick={() => setIsOpen(true)} id='btnCreateJustification'><FontAwesomeIcon icon={faClipboard}
                                                                                             size='2x'/> Crear
            justificación</button>
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
                <p className='title'>Crear una justificación</p>
                <div className='formulario'>
                    <p>Folio</p>
                    <input type='text' required onChange={handleInputChange} name="" autoFocus={true}
                           placeholder={' ...'} minLength={13} maxLength={13}/>
                    <p>Fecha a justificar</p>
                    <input type={"date"} required pattern="\d{4}-\d{2}-\d{2}"/>
                    <p>Motivo</p>
                    <ReasonSelect name={'somename'} id={1} onChange={handleInputChange}/>
                    {componentRendered}
                    <button className='aceptBtn' onClick={handleSubmit}>Crear justificación</button>
                </div>
                </div>
        </div>)
}
