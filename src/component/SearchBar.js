import React,{useState} from 'react';
import '../css/searchbar.css';
import * as FaIcons from 'react-icons/fa';
import * as GrIcons from "react-icons/gr";
import M_BeneficiaryAttendance from "./M_BeneficiaryAttendance";
import T_Inactive from "./T_Inactive";

function SearchBar({placeholder,data}) {
  const [filteredData,setFilteredData]= useState([]);
  const [wordEntered,setWordEntered]= useState("");

  const handleFilter =(event) =>{
    const searchWord= event.target.value
    setWordEntered(searchWord)
    const newFilter = data.filter((value)=>{
      return value.title.toLowerCase().includes(searchWord.toLowerCase());
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
        <div className='searchInputs'>

          <input type="text" placeholder={placeholder} value={wordEntered} onChange={handleFilter}/>



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
                            <td className={'id'}>{value.title}</td>
                            <td className={'name'}>{value.title}</td>
                            <td className={'btn'}><M_BeneficiaryAttendance/></td>
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