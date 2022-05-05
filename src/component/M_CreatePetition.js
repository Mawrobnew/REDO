import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import {faBoxOpen} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function M_CreatePetition(){
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
        <button onClick={() => setIsOpen(true)} id='btnModalCreatePetition'><FontAwesomeIcon icon={faBoxOpen} size='2x'/> Petición de paquetes</button>
    )
    return (
        <div>
            <div className='wrapper' onClick={()=>{setIsOpen(false)}}/>
            <div className='window'>
                <button className='closeBtn' onClick={()=>{setIsOpen(false)}}>X</button>
                <p className='title'>Crear una comunidad</p>
                <form onSubmit={handleSubmit}>
                    <div className='formulario'>
                        <p>Comunidad</p>
                        <select onChange={handleInputChange} name="rol">
                            {rolInventory.map((rol)=>(
                                <option value={rol.id}>{rol.label}</option>
                            ))}
                        </select>
                        <p>Número de paquetes</p>
                        <input type={"number"} max={999} min={1} required/>
                        <p>Encargado de comité</p>
                        <select onChange={handleInputChange} name="rol">
                            {rolInventory.map((rol)=>(
                                <option value={rol.id}>{rol.label}</option>
                            ))}
                        </select>
                        <button className='aceptBtn'>Crear petición</button>
                    </div>
                </form>
            </div>
        </div>)
}
