import '../css/modal.css';
import {faBoxOpen} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ValidationModal from "./API/ValidationModal";
import Select from "./API/Select";

export default function M_CreatePetition() {
    return (
        <ValidationModal
            Button={
                <button id='btnModalCreatePetition'><FontAwesomeIcon icon={faBoxOpen} size='2x'/> Petición de paquetes
                </button>
            }
            route="/request"
            method="POST"
        >
            <p className='title'>Pedir paquete</p>
            <div className='formulario'>
                <p>Comunidad</p>
                <Select name="idCommunity" route="/communities"/>
                <p>Número de paquetes</p>
                <input name="quantity" type={"number"} max={999} min={1} required/>
                <p>Encargado de comité</p>
                <Select name="idCommitteeMember" route="/committeeMembers"/>
                <button className='aceptBtn' name="formButton">Crear petición</button>
            </div>
        </ValidationModal>
    )
}
