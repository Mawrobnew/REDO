import React, { useState } from 'react';
import { Link, Outlet} from 'react-router-dom';
import '../css/Layout.css'
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import {SidebarData} from '../component/SidebarData_TS';
import { IconContext } from 'react-icons';
import { faBars } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Logo from "../img/logo.png";

export const Layout_TS = () => {

    const [sidebar, setSidebar] = useState(false);
    const showSidebar = () => setSidebar(!sidebar);

    return (
        <>
        <IconContext.Provider value={{ color: '#fff' }}>
            <div className='navbar'>
            <Link to='#' className='menu-bars'>
                <FontAwesomeIcon icon={faBars} onClick={showSidebar}/>
                <img src={Logo} alt={'logo'} className={'logoSB'}/>
            </Link>
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={showSidebar}>
                <li className='navbar-toggle'>
                <Link to='#' className='menu-bars'>
                    <FontAwesomeIcon icon={faBars} onClick={showSidebar}/>
                    <img src={Logo} alt={'logo'} className={'logoMB'}/>
                </Link>
                </li>
                <hr/>
                {SidebarData.map((item, index) => {
                return (
                    <li key={index} className={item.cName}>
                    <Link to={item.path}>
                        {item.icon}
                        <span>{item.title}</span>
                    </Link>
                    </li>
                );
                })}
            </ul>
            </nav>
            </IconContext.Provider>


            <section>
                <Outlet />
            </section>
            </>
    )
}
