import React from 'react';
import * as RiIcons from 'react-icons/ri';
import {
  faGlobe,
  faStore,
  faTruckMoving,
  faPersonCircleExclamation,
  faUsersSlash,
  faFileCircleExclamation,
  faFileClipboard
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const SidebarData = [
  {
    title: 'Lista global',
    path: 'globalbeneficiary',
    icon: <FontAwesomeIcon icon={faGlobe}/>,
    cName: 'nav-text'
  },
  {
    title: 'Asistencia en punto',
    path: 'attendance',
    icon: <FontAwesomeIcon icon={faStore}/>,
    cName: 'nav-text'
  },
  {
    title: 'Asistencia en comunidad',
    path: 'communityAssistance',
    icon: <FontAwesomeIcon icon={faTruckMoving}/>,
    cName: 'nav-text'
  },
  {
    title: 'Faltas',
    path: 'absene',
    icon: <FontAwesomeIcon icon={faPersonCircleExclamation}/>,
    cName: 'nav-text'
  },
  {
    title: 'Inactivos',
    path: 'inactive',
    icon: <FontAwesomeIcon icon={faUsersSlash}/>,
    cName: 'nav-text'
  },
  {
    title: 'Justificantes',
    path: 'justification',
    icon: <FontAwesomeIcon icon={faFileCircleExclamation}/>,
    cName: 'nav-text'
  },
  {
    title: 'Reportes',
    path: 'reports',
    icon: <FontAwesomeIcon icon={faFileClipboard}/>,
    cName: 'nav-text'
  }
];