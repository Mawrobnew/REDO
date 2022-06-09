import '../css/login.css'
import LogoB from '../img/logoB.png'

function ExpiredSession(){

    return (
        <div className='wrapperL'>
            <div className='windowL'>
                <p className='titleL'>Acceso denegado</p>
                <hr></hr>
                <p className={'subTitleL'}>Es necesario volver a <a href={'/'}>iniciar sesión</a></p>
            </div>
            <img src={LogoB} alt='logo' className={'logoLogin'}/>
        </div>
    )
}
export default ExpiredSession