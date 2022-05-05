import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import {faMagnifyingGlassPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function M_AbsenceReason(){
    const [modalInfo, setModalInfo] = useState({
        name: '',
        mail: '',
        password: '',
        phone: '',
        rol: '',
        branch: '',
    })
    const [isOpen, setIsOpen] = useState(false)
    //TODO: FETCH THIS VALUES FROM THE API LATER
    const rolInventory = [
        {id:1, label: "Super Usuario"},
        {id:2, label: "Trabajo Social"},
        {id:3, label: "Cajero"},
    ]
    const branchInventory = [
        {id:1, label: "Cuernavaca"},
        {id:2, label: "Jiutepec"},
        {id:3, label: "Temixco"},
    ]

    // updates the state on every change of the inputs or the selects
    const handleInputChange = (event) =>{
        const {name,value} = event.target
        setModalInfo({
            ...modalInfo,
            [name]:value
        })
    }

    //When the form is ready post the modal data to the backend and prevents the default behaviour of the form
    const handleSubmit = async (event) => {
        event.preventDefault()
        const result = await Request('POST', '/user', modalInfo)
        const {done, errors} = result
        if (done) setIsOpen(!isOpen)
        //TODO: DISPLAY IN RED THE ERRORS OF THE FIELDS
        console.log("TONY THIS ARE THE ERRORS TO BE DISPLAYED",errors)
    }
    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC
    if (!isOpen) return (
        <button onClick={() => setIsOpen(true)} id='btnAbsenceReason'><FontAwesomeIcon icon={faMagnifyingGlassPlus} size='1x'/></button>
    )
    return (
        <div>
            <div className='wrapper' onClick={()=>{setIsOpen(false)}}/>
            <div className='window'>
                <button className='closeBtn' onClick={()=>{setIsOpen(false)}}>X</button>
                <p className='title'>Crear una comunidad</p>
                <form onSubmit={handleSubmit}>
                    <div className='formulario'>
                        <p>Motivo</p>
                        <select onChange={handleInputChange} name="rol">
                            {rolInventory.map((rol)=>(
                                <option value={rol.id}>{rol.label}</option>
                            ))}
                        </select>
                        <p>Otro</p>
                        <input type='text' onChange={handleInputChange} name="" autoFocus={true} placeholder={' ...'} maxLength={30}/>
                        <button className='aceptBtn'>Crear comunidad</button>
                    </div>
                </form>
            </div>
        </div>)
}
