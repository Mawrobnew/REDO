import '../css/menu.css'
import React from "react";
function Menu(){

    return <nav className="main-menu">
                <ul className="contenido-menu">
                    <li>
                        <a href='../App.js'>
                            <i className="fa fa-map-marked-alt fa-2x"/>
                            <span className="nav-text" id="mapa-span">
                                        Mapa
                                    </span>
                        </a>

                    </li>
                    <li className="has-subnav">
                        <a href="#">
                            <i className="fa fa-user-friends fa-2x"/>
                            <span className="nav-text" id="recolectores-span">
                                        Recolectores
                                    </span>
                        </a>

                    </li>
                    <li className="has-subnav">
                        <a href="#">
                            <i className="fa fa-truck fa-2x"/>
                            <span className="nav-text" id="donadores-span">
                                        Donadores
                                    </span>
                        </a>

                    </li>
                    <li className="has-subnav">
                        <a href="#">
                            <i className="fa fa-shipping-fast fa-2x"/>
                            <span className="nav-text" id="donadores-extraordinarios-span">
                                        Donadores Extraordinarios
                                    </span>
                        </a>

                    </li>

                    <li className="has-subnav">
                        <a href="#">
                            <i className="fa fa-box-open fa-2x"/>
                            <span className="nav-text" id="entregas-span">
                                        Entregas
                                    </span>
                        </a>

                    </li>
                    <li className="has-subnav">
                        <a href="#">
                            <i className="fa fa-pallet fa-2x"/>
                            <span className="nav-text" id="recolecciones-span">
                                        Recolecciones
                                    </span>
                        </a>

                    </li>

                </ul>

                <ul className="logout">
                    <li>
                        <a href="#">
                            <i className="fa fa-power-off fa-2x"/>
                            <span className="nav-text" id="cerrar-sesion-span">
                                        Cerrar Sesión
                                    </span>
                        </a>
                    </li>
                </ul>
            </nav>
}
export default Menu