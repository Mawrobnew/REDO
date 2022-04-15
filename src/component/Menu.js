import '../css/menu.css'

function Menu(){

    return <nav class="main-menu">
                <ul class="contenido-menu">
                    <li>
                        <a href="#">
                            <i class="fa fa-map-marked-alt fa-2x"></i>
                            <span class="nav-text" id="mapa-span">
                                        Mapa
                                    </span>
                        </a>

                    </li>
                    <li class="has-subnav">
                        <a href="#">
                            <i class="fa fa-user-friends fa-2x"></i>
                            <span class="nav-text" id="recolectores-span">
                                        Recolectores
                                    </span>
                        </a>

                    </li>
                    <li class="has-subnav">
                        <a href="#">
                            <i class="fa fa-truck fa-2x"></i>
                            <span class="nav-text" id="donadores-span">
                                        Donadores
                                    </span>
                        </a>

                    </li>
                    <li class="has-subnav">
                        <a href="#">
                            <i class="fa fa-shipping-fast fa-2x"></i>
                            <span class="nav-text" id="donadores-extraordinarios-span">
                                        Donadores Extraordinarios
                                    </span>
                        </a>

                    </li>

                    <li class="has-subnav">
                        <a href="#">
                            <i class="fa fa-box-open fa-2x"></i>
                            <span class="nav-text" id="entregas-span">
                                        Entregas
                                    </span>
                        </a>

                    </li>
                    <li class="has-subnav">
                        <a href="#">
                            <i class="fa fa-pallet fa-2x"></i>
                            <span class="nav-text" id="recolecciones-span">
                                        Recolecciones
                                    </span>
                        </a>

                    </li>

                </ul>

                <ul class="logout">
                    <li>
                        <a href="#">
                            <i class="fa fa-power-off fa-2x"></i>
                            <span class="nav-text" id="cerrar-sesion-span">
                                        Cerrar Sesión
                                    </span>
                        </a>
                    </li>
                </ul>
            </nav>
}
export default Menu