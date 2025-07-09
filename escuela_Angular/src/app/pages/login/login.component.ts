import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'] // si tienes estilos
})
export class LoginComponent {
  correo = '';
  contrasena = '';
  error = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login(this.correo, this.contrasena).subscribe({
      next: (res:{rol: number; token: string}) => {
        const rol = res.rol;
        if (rol === 1) this.router.navigate(['/admin']);
        else if (rol === 2) this.router.navigate(['/profesor']);
        else if (rol === 3) this.router.navigate(['/alumno']);
        else this.error = 'Rol desconocido';
      },
      error: () => this.error = 'Credenciales incorrectas',
    });
  }
}
