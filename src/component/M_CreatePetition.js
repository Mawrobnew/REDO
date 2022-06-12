import '../css/modal.css';
import {faBoxOpen} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import React from 'react'
import Select from "./API/Select";
import {useState} from "react";
import {Request} from "../utils/WebRequestMiddleware";
import M_Success from "./M_Success";
import M_Fail from "./M_Fail";

export default function M_CreatePetition() {
    const [isOpen, setIsOpen] = useState(false)
    const [petitionState, setPetitionState] = useState({
        successful: false,
        failed: false
    })
    const [modalInfo, setModalInfo] = useState({})
    const [options, setOptions] = useState([])
    // updates the state on every change of the inputs or the selects
    const handleInputChange = async (event) => {
        const {name, value} = event.target
        if (name === "idCommunity") {
            const [json] = await Request('GET', '/committeeMembers/' + value)
            setOptions(json)
            if (json.length !== 0) {
                setModalInfo({
                    ...modalInfo,
                    "idCommitteeMember": 0
                })
            }
        }
        setModalInfo({
            ...modalInfo,
            [name]: value
        })
        console.log(modalInfo)
    }
    const handleSubmit = async (event) => {
        const [, code] = await Request('POST', '/request', modalInfo)
        if (code !== 200) {
            setPetitionState({
                ...petitionState,
                failed: true
            });
            return
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
            <button id='btnModalCreatePetition' onClick={() => (setIsOpen(true))}><FontAwesomeIcon icon={faBoxOpen}
                                                                                                   size='2x'/> Petición
                de paquetes
            </button>
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
                <p className='title'>Petición de paquetes</p>
                <div className='formulario'>
                    <p>Comunidad</p>
                    <Select name="idCommunity" onChange={handleInputChange} route="/communities"/>
                    <p>Número de paquetes</p>
                    <input name="quantity" type={"number"} onChange={handleInputChange} max={999} min={1} required/>
                    <p>Encargado de comité</p>
                    <select value={modalInfo.idCommitteeMember} name={"idCommitteeMember"} onChange={handleInputChange}>
                        <option defaultValue>Seleccionar</option>
                        {options.map((option) => (
                            <option value={option.Id}>{option.Nombre}</option>
                        ))}
                    </select>
                    <button className='aceptBtn' name="formButton" onClick={handleSubmit}>Crear petición</button>
                </div>
            </div>
            <M_Fail open={petitionState.failed} onClose={() => setPetitionState({...petitionState, failed: false})}/>
        </div>)
}
