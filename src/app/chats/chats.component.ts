import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  usuario: string; // Usuario con el que se está hablando
  mensaje: string; // Mensaje que se está enviando
  imagenURL: string; // URL de la imagen del usuario
  mensajes: { [usuario: string]: { mensajes: string[]; foto: string } } = {}; // Mensajes con el usuario
  mensajeNuevo: string; // Nuevo mensaje que se va a enviar

  constructor(private ruta: ActivatedRoute) {}

  // Al iniciar el componente obtenemos el usuario y el mensaje de la URL
  ngOnInit() {
    this.ruta.params.subscribe((parametros) => {
      this.usuario = parametros['usuario'];
      this.mensaje = parametros['mensaje'];

      // Recuperar el objeto del usuario de sessionStorage
      const usuarioGuardado = sessionStorage.getItem('usuario');
      if (usuarioGuardado) {
        const usuarioObj = JSON.parse(usuarioGuardado);

        // Si el objeto chats existe y tiene mensajes para el usuario actual, los recuperamos
        if (usuarioObj.chats && usuarioObj.chats[this.usuario]) {
          this.mensajes[this.usuario] = usuarioObj.chats[this.usuario];
        } else {
          this.mensajes[this.usuario] = { mensajes: [], foto: '' }; // Si no hay mensajes, inicializamos el objeto
        }
      }
    });
  }

  // Funcion para enviar un mensaje
  enviarMensaje() {
    if (!this.mensajes[this.usuario]) {
      // Si no hay mensajes para el usuario, inicializamos el objeto
      this.mensajes[this.usuario] = { mensajes: [], foto: this.imagenURL };
    }

    this.mensajes[this.usuario].mensajes.push(this.mensajeNuevo); // Agregar el mensaje al array de mensajes
    this.mensajeNuevo = ''; // Limpiar el mensaje nuevo

    // Obtener el objeto del usuario de sessionStorage
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuarioObj = JSON.parse(usuarioGuardado);

      // Si el objeto chats no existe, inicialízalo
      if (!usuarioObj.chats) {
        usuarioObj.chats = {};
      }

      // Agregar los mensajes al objeto chats bajo la propiedad del usuario con el que está hablando
      usuarioObj.chats[this.usuario] = this.mensajes[this.usuario];

      // Guardar el objeto del usuario en sessionStorage
      sessionStorage.setItem('usuario', JSON.stringify(usuarioObj));
    }
  }
}
