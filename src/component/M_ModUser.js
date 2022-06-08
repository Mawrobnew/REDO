import '../css/modal.css';
import {faUserEdit} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ValidationModal from "./API/ValidationModal";
import Select from "./API/Select";
import {Alert} from "react-bootstrap";


export default function M_ModUser({userinfo}) {
    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC
    console.log(userinfo)
    return (
        <ValidationModal Button={<button id='btnModalModUser'><FontAwesomeIcon icon={faUserEdit} size='1x'/></button>}
                         initialState={userinfo}
                         route='/users'
                         method='PUT'
        >
            <p className='title'>Modificar datos</p>
            <div className='formulario'>
                <p>Nombre</p>
                <input required type='text' name="name" autoFocus={true} placeholder={'Nombre y apellidos son acentos'}/>
                <p>Teléfono</p>
                <input required type='number' name="phone"/>
                <p>Correo</p>
                <input required type='email' name="mail"/>
                <p>Rol</p>
                <Select name="rol" route="/userRole"/>
                <p>Sucursal</p>
                <Select name="branch" route="/branch"/>
                <Alert variant="danger" name="alert"/>
                <button className='aceptBtn' name="formButton">Modificar usuairo</button>
            </div>
        </ValidationModal>
    )
}
