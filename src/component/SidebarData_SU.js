import React from 'react';
import {faFileClipboard, faGlobe} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
export const SidebarData = [
  {
    title: 'Usuarios',
    path: 'users',
    icon: <FontAwesomeIcon icon={faGlobe}/> ,
    cName: 'nav-text'
  },
  {
    title: 'Reportes',
    path: 'reports',
    icon: <FontAwesomeIcon icon={faFileClipboard}/>,
    cName: 'nav-text'
  }
  

];