import React, {useState} from "react";
import M_Fail from "../component/M_Fail";
import M_Success from "../component/M_Success";
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import Select from "./API/Select";

export default function M_CreateCommunity({initialState = {}}) {

    const [modalInfo, setModalInfo] = useState(initialState)
    const [isOpen, setIsOpen] = useState(false)
    const [validationErrors, setValidationErrors] = useState({isError: false, errors: []})
    const [options, setOptions] = useState([])

    const [petitionState, setPetitionState] = useState({
        successful: false,
        failed: false
    })

    //Returning the costum button

    if (!isOpen) return (
        <div>
            <M_Success open={petitionState.successful}
                       onClose={() => setPetitionState({...petitionState, successful: false})}/>
            <button id='btnModalCreateCommunity' onClick={() => (setIsOpen(true))}><FontAwesomeIcon icon={faUsers}
                                                                                                    size='2x'/> Crear
                comunidad
            </button>
        </div>
    )
    // updates the state on every change of the inputs or the selects
    const handleInputChange = async (event) => {
        const {name, value} = event.target
        if (name === 'state') {
            const [json] = await Request('POST', '/town', {idState: value})
            setOptions(json)
            console.log(json);
            if (json.length !== 0) {
                setModalInfo({
                    ...modalInfo,
                    "town": 0
                })
            }
        }
        setModalInfo({
            ...modalInfo,
            [name]: value
        })
    }

    const returnToDefault = () => {
        setIsOpen(false)
        setPetitionState({
            ...petitionState,
            successful: true
        })
        window.location.reload();
        setValidationErrors({isError: false, errors: []})
    }

    const handleErrorsFromAPI = (errors) => {
        //filtering the errors
        errors = errors.map(error => {
            return error.msg
        })
        setValidationErrors({
            isError: true, errors
        })
    }

    const handleSubmit = async () => {
        const [result, code] = await Request('POST', '/community', modalInfo)
        if (code === 200) {
            returnToDefault()
            return;
        }
        if (code === 422) {
            handleErrorsFromAPI(result.errors)
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
                <button className='closeBtn' onClick={() => {
                    setIsOpen(false)
                }}>X
                </button>
                <p className='title'>Crear una comunidad</p>
                <div className='formulario'>
                    <p>Nombre</p>
                    <input required type='text' name="name" onChange={handleInputChange} autoFocus={true}
                           placeholder={''}/>
                    <p>Frecuencia</p>
                    <Select name="frequency" route="/frequency" onChange={handleInputChange}/>
                    <p>Estado</p>
                    <Select name="state" route="/state" onChange={handleInputChange}/>
                    <p>Municipio</p>
                    <select value={modalInfo.idCommitteeMember} name={"town"} onChange={handleInputChange}>
                        <option defaultValue>Seleccionar</option>
                        {options.map((option) => (
                            <option value={option.Id}>{option.Municipio}</option>
                        ))}
                    </select>
                    <button className='aceptBtn' name={"formButton"} onClick={handleSubmit}>Crear comunidad</button>
                </div>
            </div>
            <M_Fail open={petitionState.failed} onClose={() => setPetitionState({...petitionState, failed: false})}/>
        </div>
    )
}
