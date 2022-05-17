import '../css/login.css'
import Logo from '../img/Blanco.png'
import { useNavigate } from 'react-router-dom';
import {Request} from "../utils/WebRequestMiddleware"
import {useState} from "react";
import {Alert} from "react-bootstrap";

function Login(){
    let navigate = useNavigate();
    const [formInfo,setFormInfo] = useState({})
    const [error, setError] = useState(false)

    const handleInputChange = (event) =>{
        const {name,value} = event.target
        setFormInfo({
            ...formInfo,
            [name]:value
        })
    }
    const HandleLogin = async (e) => {
        e.preventDefault();

        const [result, code] = await Request('POST', "/login", formInfo)
        const {done, token, role} =result
        if(done){
            sessionStorage.setItem('token', token)
            sessionStorage.setItem('role', role)
            switch (role){
                case 1:
                    navigate('/SuperUsuario')
                    break;
                case 2:
                    navigate('/TrabajoSocial')
                    break;
                case 3:
                    navigate('/Cajero')
                    break;
            }
        }else{
            setError(true)
        }
    }
    return (
        <div className='wrapperL'>
            <div className='windowL'>
                <p className='titleL'>Sistema REDO</p>
                <hr></hr>
                <p className={'subTitleL'}>Bienvenido</p>
                <div className='formularioL'>
                <form onSubmit={HandleLogin}>
                    <p>Correo</p>
                    <input type='email' placeholder='Correo electrónico' onChange={handleInputChange} autoFocus={true} name={"mail"}/>
                    <p>Contraseña</p>
                    <input type='password' maxLength={16} placeholder='********'  onChange={handleInputChange} name={"password"}/>
                    <Alert variant="danger" show={error}>
                        <Alert.Heading>Correo o contraseña inválidos</Alert.Heading>
                    </Alert>
                    <button className='aceptBtnL' onClick={HandleLogin}>Iniciar sesión</button>
                </form>
                </div>
            </div>
            <img src={Logo} alt='logo'/>
        </div>
    )
}
export default Login