import React from 'react'
import ReactDom from 'react-dom'
import '../css/modal.css';


export default function Modal({ open, children, onClose }) {
  if (!open) return null

  return ReactDom.createPortal(
    <>
      <div className='wrapper' />
      <div id='window'>
        <button id='closeBtn' onClick={onClose}>X</button>
        {children}
        <p>Modal de prueba</p>
        <form>
            <div id='formulario'>
                <p>Nombre</p>
                <input type='text'></input>
                <p>Correo</p>
                <input type='email'></input>
                <p>Telefono</p>
                <input type='number'></input>
                <p>Contraseña</p>
                <input type='text'></input>
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
                <p></p>
                <button>Crear Usuario</button>
            </div>
        </form>
      </div>
    </>,
    document.getElementById('portal')
  )
}
