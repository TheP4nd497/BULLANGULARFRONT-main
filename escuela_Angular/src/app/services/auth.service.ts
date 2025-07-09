import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';


@Injectable({ providedIn: 'root' })
export class AuthService {
  private baseUrl = 'http://localhost:8000/usuarios';

  constructor(private http: HttpClient) {}

  login(correo: string, contrasena: string): Observable<{ token: string; rol: number }> {
    return this.http.post<{ token: string; rol: number }>(
      `${this.baseUrl}/login`,
      { Correo: correo, Contrasena: contrasena }
    ).pipe(
      tap((res) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('rol', res.rol.toString());
      })
    );
  }

  getToken() {
    return localStorage.getItem('token');
  }

  getRol() {
    return Number(localStorage.getItem('rol'));
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.clear();
  }
}
