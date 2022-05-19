import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import {faUserPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ValidationModal from "./API/ValidationModal";
import {Alert} from "react-bootstrap";
import Select from "./API/Select";

export default function M_InsertUser() {
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
                <Select name="rol" route="/userRole"/>
                <p>Sucursal</p>
                <Select name="branch" route="/branch"/>
                <Alert variant="danger" name="alert"/>
                <button className='aceptBtn' name="formButton">Crear usuario</button>
            </div>
    </ValidationModal>
}
