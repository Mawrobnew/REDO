import '../css/modal.css';
import {faAddressBook} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ValidationModal from "./API/ValidationModal";
import Select from "./API/Select";
import {Alert} from "react-bootstrap";

export default function M_CreateCommittee() {
    return (
        <ValidationModal
            Button={
                <button id='btnModalCreateCommittee'><FontAwesomeIcon icon={faAddressBook} size='2x'/> Registrar comité
                </button>
            }
            route="/committeeMember"
            method="POST"
        >
            <p className='title'>Registrar un comité</p>
            <div className='formulario'>
                <p>Nombre</p>
                <input type='text' required name="name" autoFocus={true} placeholder={'Nombre y apellidos sin acentos'}/>
                <p>Teléfono</p>
                <input type={'number'} name={"phone"} required maxLength={10}/>
                <p>Comunidad</p>
                <Select name="id" route="/communities"/>
                <Alert variant="danger" name="alert"/>
                <button className='aceptBtn' name="formButton">Crear comité</button>
            </div>
        </ValidationModal>
    )
}
