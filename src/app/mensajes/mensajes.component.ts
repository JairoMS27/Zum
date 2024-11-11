import { Component, Input, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css'],
})
export class MensajesComponent implements OnInit {
  @Input() mostrarMenu = false;
  mensajes: { [usuario: string]: { mensajes: string[]; foto: string } } = {}; // Mensajes con el usuario
  nombresDeUsuarios: string[] = []; // Array de nombres de usuarios

  constructor(private ruta: Router) {}

  // Al iniciar el componente obtenemos los mensajes
  ngOnInit() {
    // Recuperar el objeto del usuario de sessionStorage
    const usuarioGuardado = sessionStorage.getItem('usuario'); // Recuperar el objeto del usuario de sessionStorage
    if (usuarioGuardado) {
      const usuarioObj = JSON.parse(usuarioGuardado);

      // Si el objeto chats existe, recupéralo
      if (usuarioObj.chats) {
        this.mensajes = usuarioObj.chats; // Recuperamos los mensajes
        this.nombresDeUsuarios = Object.keys(usuarioObj.chats); // Recuperamos los nombres de usuarios
      }
    }
  }

  // Método para abrir un chat
  abrirChat(usuario: string) {
    this.ruta.navigate(['/mensajes/chats', usuario]);
  }

  // Método para cerrar el menú
  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.mostrarMenu = false;
    }
  }
}
