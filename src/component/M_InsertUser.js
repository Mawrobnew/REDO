import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ValidationModal from "./ValidationModal";
import {Alert} from "react-bootstrap";

export default function M_InsertUser() {
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
    return <ValidationModal
        Button={
            <button id='btnModalInsertUser'><FontAwesomeIcon icon={faUserPlus} size='1x'/> Agregar Usuario</button>
        }
        route={"/users"}
    >
            <p className='title'>Agregar un usuario</p>
            <div className='formulario'>
                <p>Nombre</p>
                <input required type='text' name="name" autoFocus={true} placeholder={'Nombre'}/>
                <p>Telefono</p>
                <input required type='text' name="phone"/>
                <p>Correo</p>
                <input required type='email' name="mail"/>
                <p>Contraseña</p>
                <input required type='text' name="password"/>
                <p>Rol</p>
                <select name="rol">
                    {rolInventory.map((rol)=>(
                        <option value={rol.id}>{rol.label}</option>
                    ))}
                </select>
                <p>Sucursal</p>
                <select name="branch">
                    {branchInventory.map((rol)=>(
                        <option value={rol.id}>{rol.label}</option>
                    ))}
                </select>
                <Alert variant="danger" name="alert"/>
                <button className='aceptBtn' name="formButton">Crear usuario</button>
            </div>
    </ValidationModal>
}
