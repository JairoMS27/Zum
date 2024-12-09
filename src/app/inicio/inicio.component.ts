import { Component } from '@angular/core';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css',
})
export class InicioComponent {
  usuario: any = null;
  languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' }
  ];
  avatarUrl = 'https://i.pravatar.cc/300?img=9'; // Usando pravatar con una imagen de mujer
  interests = ['Viajes', 'Música', 'PC', 'Fotografía'];

  constructor() {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
  }
}

