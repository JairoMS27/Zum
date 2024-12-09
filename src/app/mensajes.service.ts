import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MensajesService {
  private menuMensajesAbierto = new BehaviorSubject<boolean>(false);
  private chatsSubject = new BehaviorSubject<{[usuario: string]: any}>({});
  
  menuMensajesAbierto$ = this.menuMensajesAbierto.asObservable();
  chats$ = this.chatsSubject.asObservable();

  constructor() {
    // Cargar chats del sessionStorage al iniciar
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuarioObj = JSON.parse(usuarioGuardado);
      if (usuarioObj.chats) {
        this.chatsSubject.next(usuarioObj.chats);
      }
    }
  }

  agregarMensaje(usuario: string, mensaje: any, foto: string) {
    const chatsActuales = this.chatsSubject.value;
    if (!chatsActuales[usuario]) {
      chatsActuales[usuario] = { mensajes: [], foto: foto };
    }
    chatsActuales[usuario].mensajes.push(mensaje);
    this.chatsSubject.next(chatsActuales);

    // Actualizar sessionStorage
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuarioObj = JSON.parse(usuarioGuardado);
      usuarioObj.chats = chatsActuales;
      sessionStorage.setItem('usuario', JSON.stringify(usuarioObj));
    }
  }

  toggleMenuMensajes() {
    this.menuMensajesAbierto.next(!this.menuMensajesAbierto.value);
  }
} 