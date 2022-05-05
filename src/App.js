import React, { useState, useEffect} from 'react'
import './App.css';
import Menu from './component/Menu';
import T_User from "./component/T_User";
import T_GlobalBeneficiary from "./component/T_GlobalBeneficiary";
import {BrowserRouter as Router, Routes, Route, Redirect, useLocation} from "react-router-dom";
import Login from "./component/Login"
import {Navigate} from 'react-router-dom';
import T_Attendance from "./component/T_Attendance";
import T_CommunityAssistance from "./component/T_CommunityAssistance";
import T_Absence from "./component/T_Absence";
import T_Justification from "./component/T_Justification";
import T_Inactive from "./component/T_Inactive";

let TrabajoSocial = () => {
    return <div>
        <Menu/>
        <T_User/>
        <T_GlobalBeneficiary/>
        <T_Attendance/>
        <T_CommunityAssistance/>
        <T_Absence/>
        <T_Justification/>
        <T_Inactive/>
    </div>
}
const Cajero = () => {
    return <div>
        Vista de cajero
    </div>
}

const SuperUsuario = () => {
    return <div>
        Vista de super usuario
    </div>

}
const NotFound = () => {
    return <div>
        404 Pagina no encontrada
    </div>
}
export const PrivateRoute = ({ component: Component , roles }) => {
    const token = sessionStorage.getItem('token');
    const role = sessionStorage.getItem('role')
    const location = useLocation()
    if(token === null && location.pathname !== '/login')
        return <Navigate to='/login'/>

    if(roles.includes(parseInt(role)))
        return <Component/>

    return <div>
        Acceso no autorizado
    </div>
}

//THE ID OF THE ROLES
const SUPERUSUARIO = 1;
const TRABAJOSOCIAL= 2;
const CAJERO = 3;
function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/login" element={<Login/>}/>
                <Route
                    path="/superusuario"
                    element={<PrivateRoute roles={[SUPERUSUARIO]} component={SuperUsuario} />}
                />
                <Route
                    path="/cajero"
                    element={<PrivateRoute roles={[CAJERO]} component={Cajero} />}
                />
                <Route
                    path="/trabajosocial"
                    element={<PrivateRoute roles={[TRABAJOSOCIAL]} component={TrabajoSocial} />}
                />
                <Route exact path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
