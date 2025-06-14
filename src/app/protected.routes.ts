import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login';
import { RegisterComponent } from './pages/register/register';
import { ProtectedComponent } from './pages/protected/protected';
import { authGuard } from './auth-guard';
import { Poker } from './pages/poker/poker';
import { ConfigRoom } from './pages/config-room/config-room';

export const protectedRoutes: Routes = [
  { path: '', redirectTo: 'configurar-sala', pathMatch: 'full' },
  {
    path: 'protected',
    component: ProtectedComponent,
    canActivate: [authGuard],
  },
  {
    path: 'poker/:roomid',
    component: Poker,
    canActivate: [authGuard],
  },
  {
    path: 'configurar-sala',
    component: ConfigRoom,
    canActivate: [authGuard],
  },
  { path: '**', redirectTo: 'configurar-sala' },
];
