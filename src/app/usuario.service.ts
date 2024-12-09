import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private usuario = new BehaviorSubject<any>(null);
  usuario$ = this.usuario.asObservable();

  constructor() {
    this.cargarUsuario();
  }

  cargarUsuario() {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.usuario.next({
        usuario: usuario.usuario,
        rol: usuario.rol,
        fotoPerfil: usuario.ficha?.fotoPerfil || 'https://i.imgur.com/HeIi0wU.png'
      });
    }
  }

  obtenerUsuario() {
    return this.usuario.value;
  }

  estaLogueado(): boolean {
    return this.usuario.value !== null;
  }

  cerrarSesion() {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('notificaciones');
    this.usuario.next(null);
  }
} 