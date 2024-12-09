import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from '../mensajes.service';

interface Mensaje {
  texto: string;
  hora: Date;
  sistema?: boolean;
}

@Component({
  selector: 'app-chats',
  templateUrl: './chats.component.html',
  styleUrls: ['./chats.component.css'],
})
export class ChatsComponent implements OnInit {
  usuario: string;
  mensaje: string;
  imagenURL: string;
  mensajes: { [usuario: string]: { mensajes: Mensaje[]; foto: string } } = {};
  mensajeNuevo: string = '';
  showBlockModal = false;
  showDeleteChatModal = false;
  showReportModal = false;

  reportReasons = {
    spam: false,
    offensive: false,
    fake: false,
    harassment: false,
    other: false,
  };

  reportDescription = '';

  constructor(
    private ruta: ActivatedRoute,
    private mensajesService: MensajesService
  ) {}

  ngOnInit() {
    // Suscribirse a los cambios de la ruta
    this.ruta.params.subscribe((parametros) => {
      this.usuario = parametros['usuario'];
      this.mensaje = parametros['mensaje'];
    });

    // Suscribirse a los cambios en los chats
    this.mensajesService.chats$.subscribe((chats) => {
      this.mensajes = chats;
      if (this.usuario && !this.mensajes[this.usuario]) {
        this.mensajes[this.usuario] = { mensajes: [], foto: '' };
      }
    });
  }

  enviarMensaje() {
    if (this.mensajeNuevo.trim()) {
      const nuevoMensaje = {
        texto: this.mensajeNuevo.trim(),
        hora: new Date(),
      };

      this.mensajesService.agregarMensaje(
        this.usuario,
        nuevoMensaje,
        this.mensajes[this.usuario]?.foto || ''
      );

      this.mensajeNuevo = '';
    }
  }

  openBlockModal() {
    this.showBlockModal = true;
  }

  openDeleteChatModal() {
    this.showDeleteChatModal = true;
  }

  openReportModal() {
    this.showReportModal = true;
  }

  blockUser() {
    // Implementar lógica de bloqueo
    this.showBlockModal = false;
  }

  deleteChat() {
    // Implementar lógica de eliminación
    this.showDeleteChatModal = false;
  }

  isAnyReasonSelected(): boolean {
    return Object.values(this.reportReasons).some((value) => value);
  }

  submitReport() {
    if (this.isAnyReasonSelected()) {
      // Implementar lógica de envío del reporte
      console.log('Razones:', this.reportReasons);
      console.log('Descripción:', this.reportDescription);
      this.showReportModal = false;

      // Resetear el formulario
      this.reportReasons = {
        spam: false,
        offensive: false,
        fake: false,
        harassment: false,
        other: false,
      };
      this.reportDescription = '';
    }
  }
}
