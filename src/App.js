import React, { useState, useEffect} from 'react'
import './App.css';
import Menu from './component/Menu';
import T_User from "./component/T_User";
import T_GlobalBeneficiary from "./component/T_GlobalBeneficiary";
import {BrowserRouter as  Router, Routes, Route, Redirect, useLocation,Link} from "react-router-dom";
import Login from "./component/Login"
import {Navigate} from 'react-router-dom';
import T_Attendance from "./component/T_Attendance";
import T_CommunityAssistance from "./component/T_CommunityAssistance";
import T_Absence from "./component/T_Absence";
import T_Justification from "./component/T_Justification";
import T_Inactive from "./component/T_Inactive";
import Reports from "./component/Reports"
import { Layout_TS } from './views/Layout_TS';
import { Layout_SU } from './views/Layout_SU';


let TrabajoSocial = () => {
    return <div>
        {/* <Menu/>
        <T_User/>
        <hr></hr>
        <T_GlobalBeneficiary/>
        <hr></hr>
        <T_Attendance/>
        <hr></hr>
        <T_CommunityAssistance/>
        <hr></hr>
        <T_Absence/>
        <hr></hr>
        <T_Justification/>
        <hr></hr>
        <T_Inactive/> */}

                  
    </div>
}
const Cajero = () => {
    return <div>
        Vista de cajero
    </div>
}

const SuperUsuario = () => {
    return <div>
        
        <T_User/>
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
                    element={<PrivateRoute roles={[SUPERUSUARIO]} component={Layout_SU} />}
                >
                    <Route exact path="users" element={<T_User/>}/>
                </Route>
                <Route
                    path="/cajero"
                    element={<PrivateRoute roles={[CAJERO]} component={Cajero} />}
                >
                    
                </Route>
                <Route
                    path="/trabajosocial"
                    element={<PrivateRoute roles={[TRABAJOSOCIAL]} component={Layout_TS}/>}
                >
                    <Route exact path="globalbeneficiary" element={<T_GlobalBeneficiary />}/>
                    <Route path="attendance" element={<T_Attendance />}/>
                    <Route path="communityAssistance" element={<T_CommunityAssistance />} />
                    <Route path="absene" element={<T_Absence />} />
                    <Route path="justification" element={<T_Justification/>} />
                    <Route path="inactive" element={<T_Inactive/>} />
                    <Route path="reports" element={<Reports/>} />
                </Route>
                <Route exact path="*" element={<NotFound/>}/>
            </Routes>
        </Router>
    );
}

export default App;
