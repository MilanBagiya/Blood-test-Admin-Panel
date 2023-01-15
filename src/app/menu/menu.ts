import { UserRoles } from './../auth/models/common.enum';
import { CoreMenu } from '@core/types'
import { title } from 'process';


export const menu: CoreMenu[] = [

  {
    id: "dashboard",
    title: 'dashboard',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'home',
    url: 'user/dashboard'
  },
  {
    id: 'manager',
    title: 'Managers List',
    translate: 'MENU.HOME',
    type: 'item',
    icon: 'briefcase',
    url: 'user/manager',
    role: [UserRoles.manager],
  },
  {
    id: 'lab-lists',
    title: 'lab-assitant-lists',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'database',
    url: 'user/lab-lists',
    role: [UserRoles.laborataryAssistant]
  },
  {
    id: 'user-lists',
    title: 'user-lists',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'database',
    url: 'user/user-lists',
    role: [UserRoles.manager]
  },
  {
    id: 'appoinntment list',
    title: 'Appointment List',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'book',
    url: '/user/appointments',
    role: [UserRoles.manager] ,
  },
  {
    id: 'test-lists',
    title: 'test-lists',
    translate: 'MENU.SAMPLE',
    type: 'item',
    icon: 'book',
    url: 'user/test-lists',
    role: [UserRoles.manager],
  },
  {
    id: 'usertest',
    title: 'User Test Assigned',
    translate:'MENU.SAMPLE',
    type:'item',
    icon:'book',
    url:'user/usertest',
    role:[UserRoles.laborataryAssistant],

  }
]
