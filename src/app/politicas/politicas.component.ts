import { Component } from '@angular/core';

@Component({
  selector: 'app-politicas',
  templateUrl: './politicas.component.html',
  styleUrl: './politicas.component.css',
})
export class PoliticasComponent {
  usuario: any = null;
  languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' }
  ];

  constructor() {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
  }
}
