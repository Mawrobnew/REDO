import React from 'react'
import {faUserCheck} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../css/modal.css';
import RequestModal from "./API/RequestModal";


export default function M_BeneficiaryAttendance({beneficiary}) {
    return (<RequestModal Button={
        <button id='btnModalAttendanceCashier'><FontAwesomeIcon icon={faUserCheck} size='1x'/></button>
    }
                          route='/attendance'
                          method='POST'
                          initialState={beneficiary}
    >
        <div className='formulario'>
            <p>Nombre</p>
            <p>{beneficiary.name}</p>
            <button className='yesBtn' name='confirmation'>Si</button>
            <button className={'noBtn'} name='cancelation'>No</button>
        </div>
    </RequestModal>)
}
