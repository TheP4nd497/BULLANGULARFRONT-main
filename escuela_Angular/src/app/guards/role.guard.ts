import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const allowedRoles: number[] = route.data['roles'];
    const userRol = this.auth.getRol();

    // Verifica si el usuario está autenticado
    if (!this.auth.isLoggedIn()) {
      this.router.navigate(['/']);
      return false;
    }

    // Verifica si el rol del usuario está permitido
    if (allowedRoles.includes(userRol)) {
      return true;
    }

    // Rol no autorizado
    this.router.navigate(['/']);
    return false;
  }
}
