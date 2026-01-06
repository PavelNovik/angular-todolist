import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { Users } from './components/users/users';
import { Todolists } from './components/todolists/todolists';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home',
  },
  {
    path: 'users',
    component: Users,
    title: 'Users',
  },
  {
    path: 'todolists',
    component: Todolists,
    title: 'Todolists',
  },
];
