import '../css/modal.css';
export default function M_Success({open, onClose}) {
    if(!open) return null

    return <div>
            <div className='wrapper'onClick={onClose}/>
            <div className='window'>
                <button className='closeBtn' onClick={onClose}>X</button>
                <p className='title'>La operación ha sido exitosa</p>
            </div>
        </div>
}
