import React, { useState, useEffect} from 'react'
import './App.css';
import Menu from './component/Menu';
import T_User from "./component/T_User";
import T_GlobalBeneficiary from "./component/T_GlobalBeneficiary";
import T_BeneficiaryDocuments from "./component/T_BeneficiaryDocuments";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login"
import { useNavigate } from 'react-router-dom';

let TrabajoSocial = ()=>{
    const navigate = useNavigate();
    useEffect(()=>{
        const token = sessionStorage.getItem("token")
        if(token === null) {
            navigate('/login')
        }
    },[])

    return <div>
        <Menu/>
        <T_User/>
        <T_GlobalBeneficiary/>
    </div>
}
const Cajero = ()=>{
   return <div>
       Vista de cajero
   </div>
}

const SuperUsuario = ()=>{
    return <div>
        Vista de super usuario
    </div>

}
const NotFound = ()=>{
    return <div>
        404 Pagina no encontrada
    </div>
}
function App() {
  return (
      <Router>
      <Routes>
        <Route exact path="/login" element={<Login/>} />
          <Route exact path="/TrabajoSocial" element={<TrabajoSocial/>} />
          <Route exact path="/SuperUsuario" element={<SuperUsuario/>}/>
          <Route exact path="/Cajero" element={<Cajero/>}/>
          <Route exact path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
