import { Routes } from '@angular/router';
import { Home } from './components/home/home';

export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Home',
  },
  {
    path: 'users',
    loadComponent: () => import('./components/users/users').then((m) => m.Users),
    title: 'Users',
  },
  {
    path: 'todolist',
    loadComponent: () => import('./components/todolist/todolist').then((m) => m.Todolist),
    title: 'Todolist',
  },
];
