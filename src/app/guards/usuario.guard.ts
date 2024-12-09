import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuarioGuard {
  constructor(private router: Router) {}

  // Este método vai ser o que determine se a ruta é accesible ou non
  canActivate(): boolean {
    let usuario = sessionStorage.getItem('usuario'); // Recuperamos o valor do usuario da sesión actual (se o hai)
    if (usuario) {
      return true; // Se o usuario está logueado, permítese o acceso á ruta
    } else {
      this.router.navigate(['']); // Se non hai usuario logueado, impídese o acceso e rediríxese á páxina de login
      return false;
    }
  }
}
