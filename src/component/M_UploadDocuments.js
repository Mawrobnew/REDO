import React, {useRef, useState} from 'react'
import {HOST,FileHost, Request} from "../utils/WebRequestMiddleware";
import '../css/modal.css';
import { faFileArchive } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default function M_UploadDocuments() {
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
    const form = useRef()
    const handleSubmit = async (event) => {
        const formData= new FormData(form.current)
        const [result, code] = await Request ('POST', '/', formData)
        const {done} = result
        if (done) setIsOpen(!isOpen)
        event.preventDefault()
    }
    //TODO: CREATE FIELD AND SELECT COMPONENTS THAT HANDLE REPEATED LOGIC
    if (!isOpen) return (
        <button onClick={() => setIsOpen(true)} id='btnModalUploadDocs'><FontAwesomeIcon icon={faFileArchive} size='1x'/></button>
    )
    return (
        <div>
            <div className='wrapper' onClick={()=>{setIsOpen(false)}}/>
            <div className='window'>
                <button className='closeBtn' onClick={()=>{setIsOpen(false)}}>X</button>
                <p className='title'>Subir documentos</p>
                <form  action={FileHost} target={HOST+'/trabajoSocial'} method='POST' enctype='multipart/form-data'>
                    <div className='formulario'>

                        <p>Credencial</p>
                        <input required type="file" id="archivo" name="archivo" accept=".jpg, .jpeg, .png, .pdf"/>

                        <button className='aceptBtn'>Enviar</button>
                    </div>
                </form>
            </div>
        </div>)
}
