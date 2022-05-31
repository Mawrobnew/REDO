import React, {useState} from 'react'
import '../css/modal.css';
import {faEye, faEyeSlash, faUserPlus} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import ValidationModal from "./API/ValidationModal";
import {Alert} from "react-bootstrap";
import Select from "./API/Select";

export default function M_InsertUser() {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return <ValidationModal
        Button={
            <button id='btnModalInsertUser'><FontAwesomeIcon icon={faUserPlus} size='1x'/> Agregar usuario</button>
        }
        route={"/users"}
    >
            <p className='title'>Agregar un usuario</p>
            <div className='formulario'>
                <p>Nombre</p>
                <input required type='text' name="name" autoFocus={true} placeholder={'Nombre y apellidos'}/>
                <p>Teléfono</p>
                <input required type='number' name="phone" placeholder={'Máx. 10 digitos'} maxLength={10} />
                <p>Correo</p>
                <input required type='email' name="mail"/>
                <p>Rol</p>
                <Select name="rol" route="/userRole"/>
                <p>Sucursal</p>
                <Select name="branch" route="/branch"/><p>Contraseña</p>
                <input type={passwordShown ? "text" : "password"} placeholder={'Entre 8 y 16 caracteres'}
                       name="password" minLength={8} maxLength={16}/>
                <Alert variant="danger" name="alert"/>
                <button type={"button"} onClick={togglePassword} className={'changePassBtn'}><FontAwesomeIcon
                    icon={passwordShown ? faEyeSlash : faEye} size='1x'/></button>
                <button className='aceptBtn' name="formButton">Crear usuario</button>

            </div>
    </ValidationModal>
}
