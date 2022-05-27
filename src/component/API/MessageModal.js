import '../../css/modal.css';

export default function MessageModal({open, onClose, message}) {
    if (!open) return null
    return (
        <div>
            <div className='wrapper' onClick={onClose}/>
            <div className='window'>
                <button className='closeBtn' onClick={onClose}>X</button>
                <p className='title'>{message}</p>
            </div>
        </div>)
}
