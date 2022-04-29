import '../css/login.css'
import Logo from '../img/Blanco.png'
import { useNavigate } from 'react-router-dom';
import {Request} from "../utils/WebRequestMiddleware"
import {useEffect, useState} from "react";

function Login(){
    let navigate = useNavigate();
    const [formInfo,setFormInfo] = useState({})

    const handleInputChange = (event) =>{
        const {name,value} = event.target
        setFormInfo({
            ...formInfo,
            [name]:value
        })
    }
    const HandleLogin = async (e) => {
        e.preventDefault();

        const result = await Request('POST', "/login", formInfo)
        const {done, token} =result
        if(done){
            sessionStorage.setItem('token', token)
            navigate("/")
        }
    }
    return (
        <div className='wrapperL'>
            <div className='windowL'>
                <p className='titleL'>Iniciar sesión</p>
                <hr></hr>
                <div className='formularioL'>
                <form onSubmit={HandleLogin}>
                    <p>Correo</p>
                    <input type='email' placeholder='Correo electrónico' onChange={handleInputChange} autoFocus={true} name={"mail"}/>
                    <p>Contraseña</p>
                    <input type='password' minLength={4} maxLength={16} placeholder='********'  onChange={handleInputChange} name={"password"}/>
                    <button className='aceptBtnL' onClick={HandleLogin}>Iniciar sesión</button>
                </form>
                </div>
            </div>
            <img src={Logo} alt='logo'/>
        </div>
    )
}
export default Login