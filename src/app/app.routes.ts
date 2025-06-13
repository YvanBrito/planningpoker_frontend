import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ProtectedComponent } from './pages/protected/protected';
import { authGuard } from './auth-guard';
import { Poker } from './pages/poker/poker';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [authGuard],
  },
  {
    path: 'poker',
    component: Poker,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'login' },
];
