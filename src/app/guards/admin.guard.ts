import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AdminGuard {
  constructor(private router: Router) {}

  // Este método vai ser o que determine se a ruta é accesible ou non
  canActivate(): boolean {
    let usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}'); // Recuperamos o valor do usuario da sesión actual (se o hai)
    if (
      (usuario && usuario.rol === 'administrador') ||
      usuario.rol === 'admin'
    ) {
      return true; // Se o usuario está logueado y es administrador, permítese o acceso á ruta
    } else {
      this.router.navigate(['']); // Se non hai usuario logueado o no es administrador, impídese o acceso e rediríxese á páxina de login
      return false;
    }
  }
}
