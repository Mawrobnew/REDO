import React from 'react';
import * as RiIcons from 'react-icons/ri';
export const SidebarData = [
  {
    title: 'Lista global',
    path: 'globalbeneficiary',
    icon: <RiIcons.RiGlobalLine />,
    cName: 'nav-text'
  },
  {
    title: 'Asistencia en punto',
    path: 'attendance',
    icon: <RiIcons.RiStore2Line />,
    cName: 'nav-text'
  },
  {
    title: 'Asistencia en comunidad',
    path: 'communityAssistance',
    icon: <RiIcons.RiTruckLine />,
    cName: 'nav-text'
  },
  {
    title: 'Faltas',
    path: 'absene',
    icon: <RiIcons.RiFileWarningLine />,
    cName: 'nav-text'
  },
  {
    title: 'Inactivos',
    path: 'inactive',
    icon: <RiIcons.RiEyeOffLine />,
    cName: 'nav-text'
  },
  {
    title: 'Justificantes',
    path: 'justification',
    icon: <RiIcons.RiFileInfoLine />,
    cName: 'nav-text'
  },
  {
    title: 'Reportes',
    path: 'reports',
    icon: <RiIcons.RiFileList3Line/>,
    cName: 'nav-text'
  }
];