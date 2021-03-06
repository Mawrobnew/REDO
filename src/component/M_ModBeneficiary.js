import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function M_ModBeneficiary() {
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
        const result = await Request('POST', '/user', modalInfo)
        const {done} = result
        if (done) setIsOpen(!isOpen)
        event.preventDefault()
    }
    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC
    if (!isOpen) return (
        <button onClick={() => setIsOpen(true)} id='btnModalModBen'><FontAwesomeIcon icon={faUserEdit} size='1x'/></button>
    )
    return (
        <div>
            <div className='wrapper' onClick={()=>{setIsOpen(false)}}/>
            <div className='window'>
                <button className='closeBtn' onClick={()=>{setIsOpen(false)}}>X</button>
                <p className='title'>Modificar datos</p>
                <form onSubmit={handleSubmit}>
                    <div className='formulario'>
                        <p>Nombre</p>
                        <input required type='text' onChange={handleInputChange} name="name" autoFocus={true} placeholder={'Nombre'} readOnly/>
                        <p>Tel??fono</p>
                        <input required type='number' onChange={handleInputChange} name="phone"/>
                        <p>Beca</p>
                        <select onChange={handleInputChange} name="branch">
                            {branchInventory.map((rol)=>(
                                <option value={rol.id}>{rol.label}</option>
                            ))}
                        </select>
                        <p>D??a</p>
                        <select onChange={handleInputChange} name="branch">
                            {branchInventory.map((rol)=>(
                                <option value={rol.id}>{rol.label}</option>
                            ))}
                        </select>
                        <p>Frecuencia</p>
                        <select onChange={handleInputChange} name="branch">
                            {branchInventory.map((rol)=>(
                                <option value={rol.id}>{rol.label}</option>
                            ))}
                        </select>
                        <button className='aceptBtn'>Modificar beneficiario</button>
                    </div>
                </form>
            </div>
        </div>)
}
