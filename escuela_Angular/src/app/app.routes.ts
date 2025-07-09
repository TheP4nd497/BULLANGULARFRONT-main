import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardAdminComponent } from './pages/dashboard-admin/dashboard-admin.component';
import { DashboardProfesorComponent } from './pages/dashboard-profesor/dashboard-profesor.component';
import { DashboardAlumnoComponent } from './pages/dashboard-alumno/dashboard-alumno.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'admin',
    component: DashboardAdminComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [1] }
  },
  {
    path: 'profesor',
    component: DashboardProfesorComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [2] }
  },
  {
    path: 'alumno',
    component: DashboardAlumnoComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { roles: [3] }
  },
  { path: '**', redirectTo: '' }
];
