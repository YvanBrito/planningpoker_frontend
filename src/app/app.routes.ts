import { Routes } from '@angular/router';
import { authRoutes } from './auth.routes';
import { protectedRoutes } from './protected.routes';

export const routes: Routes = localStorage.getItem('token')
  ? protectedRoutes
  : authRoutes;
