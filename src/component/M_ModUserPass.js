import React, {useState} from 'react'
import '../css/modal.css';
import {faKey, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ValidationModal from "./API/ValidationModal";
import {Alert} from "react-bootstrap";


export default function M_ModUserPass({id}) {
    const [passwordShown, setPasswordShown] = useState(false);
    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <ValidationModal
            Button={
                <button id='btnModalModUserPass'><FontAwesomeIcon icon={faKey} size='1x'/></button>
            }
            route="/user"
            method="PUT"
            initialState={id}
        >
            <p className='title'>Cambiar contraseña</p>
            <div className='formulario'>
                <p>Contraseña nueva</p>
                <input type={passwordShown ? "text" : "password"} placeholder={'Entre 8 y 16 caracteres'}
                       name="password" minLength={8} maxLength={16}/>
                <p>Confirmar contraseña</p>
                <input type={passwordShown ? "text" : "password"} placeholder={'Entre 8 y 16 caracteres'}
                       name="confirmationPassword" minLength={8} maxLength={16}/>
                <Alert variant="danger" name="alert"/>
                <button type={"button"} onClick={togglePassword} className={'changePassBtn'}><FontAwesomeIcon
                    icon={passwordShown ? faEyeSlash : faEye} size='1x'/></button>
                <button className='aceptBtn' name="formButton">Modificar contraseña</button>
            </div>
        </ValidationModal>
    )
}
