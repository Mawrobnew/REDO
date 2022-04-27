import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import { faUserXmark } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import '../css/modal.css';


export default function M_DeleteUser() {
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
        <button onClick={() => setIsOpen(true)} id='btnModalDeleteUser'><FontAwesomeIcon icon={faUserXmark} size='1x'/></button>
    )
    return (
        <div>
            <div className='wrapper' onClick={()=>{setIsOpen(false)}}/>
            <div className='window'>
                <p className='title'>Eliminar usuario</p>
                <form onSubmit={handleSubmit}>
                    <div className='formulario'>
                        <p>Nombre</p>
                        <input type='text' onChange={handleInputChange} name="name" autoFocus={true} placeholder={'Nombre'} readOnly/>
                        <button className='yesBtn'>Si</button>
                        <button className='noBtn' onClick={()=>{setIsOpen(false)}}>No</button>
                    </div>
                </form>
            </div>
        </div>)
}
