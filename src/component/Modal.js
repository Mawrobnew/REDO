import React from 'react'
import ReactDom from 'react-dom'
import '../css/modal.css';


export default function Modal({ open, children, onClose }) {
    if (!open) return null
    //Prevent the default action of the form
    const handleSubmit = (event) => {
        //Prevents the update of the modal
      event.preventDefault()
    }

  return ReactDom.createPortal(
    <>
      <div className='wrapper' />
      <div id='window'>
        <button id='closeBtn' onClick={onClose}>X</button>
        {children}
        <p>Modal de prueba</p>
        <form onSubmit={handleSubmit}>
            <div id='formulario'>
                <p>Nombre</p>
                <input type='text'/>
                <p>Correo</p>
                <input type='email'/>
                <p>Telefono</p>
                <input type='number'/>
                <p>Contraseña</p>
                <input type='text'/>
                <p>Rol</p>
                <select>
                    <option>Trabajo Social</option>
                    <option>Cajero</option>
                    <option>Super Usuario</option>
                </select>
                <p>Sucursal</p>
                <select>
                    <option>Temixco</option>
                    <option>Cuernavaca</option>
                    <option>Jiutepec</option>
                </select>
                <p/>
                <button>Crear Usuario</button>
            </div>
        </form>
      </div>
    </>,
    document.getElementById('portal')
  )
}
