import '../css/login.css'
import Logo from '../img/Blanco.png'

function Login(){
    return (
        <div className='wrapperL'>
            <div className='windowL'>
                <p className='titleL'>Iniciar sesión</p>
                <hr></hr>
                <div className='formularioL'>
                <form>
                    <p>Correo</p>
                    <input type='email' placeholder='Correo electrónico' autoFocus={true}></input>
                    <p>Contraseña</p>
                    <input type='password' minLength={4} maxLength={16} placeholder='********'></input>
                    <button className='aceptBtn'>Iniciar sesión</button>
                </form>
                </div>
            </div>
            <img src={Logo} alt='logo'/>
        </div>
    )
}
export default Login