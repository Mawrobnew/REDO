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
        if (done) onClose()
        event.preventDefault()
    }
    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC

    console.log(modalInfo)
    if (!open) return null
  return ReactDom.createPortal(
    <div>
      <div className='wrapper' />
      <div className='window'>
        <button className='closeBtn' onClick={onClose}>X</button>
        {children}
        <p className='title'>Insertar Usuario Lorem ipsum dolor sit amet1</p>
        <form onSubmit={handleSubmit}>
            <div className='formulario'>
                <p>Nombre</p>
                <input type='text' onChange={handleInputChange} name="name" autoFocus={true} placeholder={'Nombre'}/>
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
                <button className='aceptBtn'>Crear Usuario</button>
            </div>
        </form>
      </div>
    </div>,
    document.getElementById('portal')
  )
}
