import React, {useState} from 'react'
import ReactDom from 'react-dom'
import '../css/modal.css';
import {Request} from "../utils/WebRequestMiddleware";


export default function Modal({ open, children, onClose }) {
    const [modalInfo, setModalInfo] = useState({
        name: '',
        mail: '',
        password: '',
        phone: '',
        rol: '',
        branch: '',
    })

    //TODO: FETCH THIS VALUES FROM THE API LATER
    const rolInventory = [
        {id:1, label: "Trabajo Social"},
        {id:2, label: "Cajero"},
        {id:3, label: "Super Usuario"}
    ]
    const branchInventory = [
        {id:1, label: "Temixco"},
        {id:2, label: "Cuernavaca"},
        {id:3, label: "Jiutepec"},
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
    const handleSubmit = (event) => {
        //Prevents the update of the modal
      event.preventDefault()
    }
    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC

    console.log(modalInfo)
    if (!open) return null
  return ReactDom.createPortal(
    <div>
      <div className='wrapper' />
      <div id='window'>
        <button id='closeBtn' onClick={onClose}>X</button>
        {children}
        <p>Modal de prueba</p>
        <form onSubmit={handleSubmit}>
            <div id='formulario'>
                <p>Nombre</p>
                <input type='text' onChange={handleInputChange} name="name"/>
                <p>Correo</p>
                <input type='text' onChange={handleInputChange} name="mail"/>
                <p>Telefono</p>
                <input type='text' onChange={handleInputChange} name="phone"/>
                <p>Contraseña</p>
                <input type='text' onChange={handleInputChange} name="password"/>
                <p>Rol</p>
                <select onChange={handleInputChange} name="rol">
                    {rolInventory.map((rol)=>(
                        <option value={rol.id}>{rol.label}</option>
                    ))}
                </select>
                <p>Sucursal</p>
                <select onChange={handleInputChange} name="branch">
                    {branchInventory.map((rol)=>(
                        <option value={rol.id}>{rol.label}</option>
                    ))}
                </select>
                <p/>
                <button>Crear Usuario</button>
            </div>
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  )
}
