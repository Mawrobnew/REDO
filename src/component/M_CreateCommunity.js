import '../css/modal.css';
import {faUsers} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import ValidationModal from "./API/ValidationModal";
import Select from "./API/Select";

export default function M_CreateCommunity() {
    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC
    return (
        <ValidationModal
            Button={
                <button id='btnModalCreateCommunity'><FontAwesomeIcon icon={faUsers} size='2x'/> Crear comunidad
                </button>
            }
            route={"/community"}
        >
            <p className='title'>Crear una comunidad</p>
            <div className='formulario'>
                <p>Nombre</p>
                <input required type='text' name="name" autoFocus={true} placeholder={''}/>
                <p>Frecuencia</p>
                <Select name="frequency" route="/frequency"/>
                <p>Municipio</p>
                <Select name="town" route="/towns"/>
                <button className='aceptBtn' name={"formButton"}>Crear comunidad</button>
            </div>
        </ValidationModal>
    )
}
