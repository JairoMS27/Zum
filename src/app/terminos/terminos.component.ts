import { Component } from '@angular/core';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrl: './terminos.component.css',
})
export class TerminosComponent {
  usuario: any = null;
  languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
  ];

  constructor() {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
  }
}
