import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import {faClipboard} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ReasonSelect from "./API/ReasonSelect";
import M_Success from "./M_Success";
import M_Fail from "./M_Fail";
import MessageModal from "./API/MessageModal";

export default function M_CreateJustification() {
    const [isOpen, setIsOpen] = useState(false)
    const [modalInfo, setModalInfo] = useState();
    const [renderHidden, setRenderHidden] = useState(false);
    const [petitionState, setPetitionState] = useState({
        successful: false,
        failed: false,
        message: ''
    })
    const handleSubmit = async () => {
        const [json, code] = await Request('POST', '/justification', modalInfo)
        if (code !== 200) {
            setPetitionState({
                ...petitionState,
                failed: true,
                message: 'La operación ha fallado'
            });
            return
        }
        const {message, done} = json[0];
        if (done === 1) {
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
            failed: true,
            message
        });
    }
    // returns true if option with child "OTRO" is selected
    const OtherIsSelected = ({options, value}) => {
        return options[Number(value)].text === "OTROS"
    }
    const handleInputChange = (event) => {
        const {name, value} = event.target
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
        console.log(modalInfo)
    }
    const OtherSelect = <div>
        <p>Otro</p>
        <input type='text' onChange={handleInputChange} name="textReason" placeholder={' ...'} maxLength={30}/>
    </div>
    const componentRendered = (renderHidden) ? OtherSelect : <td/>

    if (!isOpen) return (
        <div>
            <button onClick={() => setIsOpen(true)} id='btnCreateJustification'><FontAwesomeIcon icon={faClipboard}
                                                                                                 size='2x'/> Crear
                justificación
            </button>
            <M_Success open={petitionState.successful}
                       onClose={() => setPetitionState({...petitionState, successful: false})}/>
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
                <p className='title'>Crear una justificación</p>
                <div className='formulario'>
                    <p>Folio</p>
                    <input type='text' required onChange={handleInputChange} name="folio" autoFocus={true}
                           placeholder={' ...'} minLength={13} maxLength={13}/>
                    <p>Fecha a justificar</p>
                    <input type={"date"} name={'date'} onChange={handleInputChange} required
                           pattern="\d{4}-\d{2}-\d{2}"/>
                    <p>Motivo</p>
                    <ReasonSelect name={'idReason'} id={1} onChange={handleInputChange}/>
                    {componentRendered}
                    <button className='aceptBtn' onClick={handleSubmit}>Crear justificación</button>
                </div>
            </div>
            <MessageModal open={petitionState.failed}
                          onClose={() => setPetitionState({...petitionState, failed: false})}
                          message={petitionState.message}/>
        </div>)
}
