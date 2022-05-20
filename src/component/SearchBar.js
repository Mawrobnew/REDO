import React, {useEffect, useState} from 'react';
import '../css/searchbar.css';
import * as FaIcons from 'react-icons/fa';
import * as GrIcons from "react-icons/gr";
import M_BeneficiaryAttendanceCashier from "./M_BeneficiaryAttendanceCashier";
import {Request} from "../utils/WebRequestMiddleware";
import '../css/Layout.css'
import Logo from "../img/logo.png";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPowerOff} from "@fortawesome/free-solid-svg-icons";

function SearchBar({placeholder,data}) {
  const [filteredData,setFilteredData]= useState([]);
  const [wordEntered,setWordEntered]= useState("");

  const[attendance, setAttendance]= useState([]);

  useEffect(() => {
    const handleBeneficiary = async () => {
      const [result, code] = await Request('GET', '/attendanceJustify')
      const {done, errors} = result
      setAttendance(result)
      console.log("(Cajero) Llena el modal de cajero")
      //console.log("(Cajero) attendance ", attendance)
      //console.log("(Cajero) result ", result)
    }
    handleBeneficiary()
    //console.log("(Cajero) attendance ", attendance)
  },[])

  const handleFilter =(event) =>{
    // handleBeneficiary()
    //console.log("Data ", data)
    const searchWord= event.target.value
    setWordEntered(searchWord)
    //console.log("(Cajero) attendance ", attendance)
    const newFilter = attendance.filter(value => {
      //console.log(value.title.toLowerCase())
      return value.Folio.toLowerCase().includes(searchWord.toLowerCase());
    })

    if(searchWord===""){
      setFilteredData([])
    }
    else{
      setFilteredData(newFilter);
    }
  };

  const clearInput=()=>{
    setFilteredData([]);
    setWordEntered("")
  }

  return (
      <div className='search'>
        <div className={'navbar'}>
          <img src={Logo} alt={'logo'} className={'logoSB'}/>
          <button className='btnCloseSesion'>
            <FontAwesomeIcon icon={faPowerOff}/>
            <span>Cerrar sesión</span>
          </button>
        </div>
        <div className='searchInputs'>

          <input className={'inputCashier'} type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter}/>

          <div className='searchIcon'>
            {filteredData.length===0 ? <FaIcons.FaSearch/> : <GrIcons.GrClose id="clearBtn" onClick={clearInput}/>}
          </div>

        </div>
        {filteredData.length!== 0 && (
            <div className='dataResult'>
              {filteredData.map((value,key)=>{
                return (
                    <div>
                      <div className='dataItem'  target="_blank">
                        <table>
                          <tr>
                            <td className={'id'}>{value.Folio}</td>
                            <td className={'name'}>{value.Nombre}</td>
                            <td className={'btn'}>
                              <M_BeneficiaryAttendanceCashier
                                  beneficiary={{folio: value.Folio, name: value.Nombre, attendance: 1}}/>
                            </td>
                          </tr>
                        </table>
                      </div>
                    </div>
              );
              })}
            </div>
        )}

      </div>
  )
}

export default SearchBar