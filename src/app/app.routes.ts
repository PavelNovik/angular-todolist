import { Routes } from '@angular/router';
import { Home } from './components/home/home';
import { PageNotFound } from './components/page-not-found/page-not-found';
import { Login } from './components/login/login';

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
  {
    path: 'login',
    component: Login,
    title: 'Login',
  },
  {
    path: 'pageNotFound',
    component: PageNotFound,
    title: 'Page not found',
  },
  { path: '**', redirectTo: 'pageNotFound' },
];
