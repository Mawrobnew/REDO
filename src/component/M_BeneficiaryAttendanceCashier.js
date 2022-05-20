import React, {useState} from 'react'
import {Request} from "../utils/WebRequestMiddleware";
import {faUserCheck} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import '../css/modal.css';
import ValidationModal from "./API/ValidationModal";
import RequestModal from "./API/RequestModal";


export default function M_BeneficiaryAttendance({beneficiary}) {
    return (<RequestModal Button={
        <button id='btnModalAttendanceCashier'><FontAwesomeIcon icon={faUserCheck} size='1x'/></button>
    }
                          route='/attendance'
                          method='POST'
                          initialState={beneficiary}
    >
        <p>Nombre</p>
        <div>{beneficiary.name}</div>
        <button className='yesBtn' name='confirmation'>Si</button>
        <button className={'noBtn'} name='cancelation'>No</button>
    </RequestModal>)
}
