import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import { faKey, faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function M_ModUserPass() {
    const [modalInfo, setModalInfo] = useState({
        name: '',
        mail: '',
        password: '',
        phone: '',
        rol: '',
        branch: '',
    })
    const [isOpen, setIsOpen] = useState(false)
    //TODO: FETCH THIS VALUES FROM THE API LATER
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

    // updates the state on every change of the inputs or the selects
    const handleInputChange = (event) =>{
        const {name,value} = event.target
        setModalInfo({
            ...modalInfo,
            [name]:value
        })
    }

    //When the form is ready post the modal data to the backend and prevents the default behaviour of the form
    const handleSubmit = async (event) => {
        const result = await Request('POST', '/user', modalInfo)
        const {done} = result
        if (done) setIsOpen(!isOpen)
        event.preventDefault()
    }

    const [passwordShown, setPasswordShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!passwordShown);
    };

    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC
    if (!isOpen) return (
        <button onClick={() => setIsOpen(true)} id='btnModalModUserPass'><FontAwesomeIcon icon={faKey} size='1x'/></button>
    )
    return (
        <div>
            <div className='wrapper' onClick={()=>{setIsOpen(false)}}/>
            <div className='window'>
                <button className='closeBtn' onClick={()=>{setIsOpen(false)}}>X</button>
                <p className='title'>Modificar contraseña</p>
                <form onSubmit={handleSubmit}>
                    <div className='formulario'>

                        <p>Contraseña</p>
                        <input type={passwordShown ? "text" : "password"} placeholder={'Entre 8 y 16 caractéres'} onChange={handleInputChange}
                               name="pass1" minLength={8} maxLength={16}/>

                        <p>Confirmar contraseña</p>
                        <input type={passwordShown ? "text" : "password"} placeholder={''} onChange={handleInputChange}
                               name="pass2" minLength={8} maxLength={16}/>

                        <button type={"button"} onClick={togglePassword} className={'changePassBtn'}><FontAwesomeIcon icon={passwordShown ? faEyeSlash : faEye} size='1x'/></button>
                        <button className='aceptBtnPass'>Modificar contraseña</button>
                    </div>
                </form>
            </div>
        </div>)
}
