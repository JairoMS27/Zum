import { Component, Input, HostListener, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MensajesService } from '../mensajes.service';
import { NotificacionesService } from '../notificaciones-servizo.service';
import { Subscription } from 'rxjs';

interface Mensaje {
  texto: string;
  hora: Date;
  sistema?: boolean;
}

@Component({
  selector: 'app-mensajes',
  templateUrl: './mensajes.component.html',
  styleUrls: ['./mensajes.component.css'],
})
export class MensajesComponent implements OnInit, OnDestroy {
  @Input() mostrarMenu = false;
  mensajes: { [usuario: string]: { mensajes: Mensaje[]; foto: string } } = {};
  nombresDeUsuarios: string[] = [];
  chatActivo: string | null = null;
  mensajeNuevo: string = '';
  showBlockModal = false;
  showReportModal = false;
  private subscriptions: Subscription[] = [];

  reportReasons = {
    spam: false,
    offensive: false,
    fake: false,
    harassment: false,
    other: false,
  };

  reportDescription = '';

  get matches() {
    return this.nombresDeUsuarios.map((usuario) => ({
      nombre: usuario,
      foto: this.mensajes[usuario].foto,
    }));
  }

  constructor(
    private ruta: Router,
    private mensajesService: MensajesService,
    private servicioNotificaciones: NotificacionesService
  ) {}

  ngOnInit() {
    this.subscriptions.push(
      // Suscribirse a los cambios en los chats
      this.mensajesService.chats$.subscribe(chats => {
        this.mensajes = chats;
        this.nombresDeUsuarios = Object.keys(chats);
      }),
      // Suscribirse al estado del menú
      this.mensajesService.menuMensajesAbierto$.subscribe(
        abierto => this.mostrarMenu = abierto
      )
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  abrirChat(usuario: string) {
    this.chatActivo = usuario;
  }

  volverALista() {
    this.chatActivo = null;
  }

  enviarMensaje() {
    if (this.chatActivo && this.mensajeNuevo.trim()) {
      const nuevoMensaje: Mensaje = {
        texto: this.mensajeNuevo.trim(),
        hora: new Date(),
      };

      this.mensajesService.agregarMensaje(
        this.chatActivo,
        nuevoMensaje,
        this.mensajes[this.chatActivo].foto
      );

      // Enviar notificación al destinatario
      this.servicioNotificaciones.notificarMensaje(this.chatActivo);

      this.mensajeNuevo = '';
    }
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Escape') {
      this.mensajesService.toggleMenuMensajes();
    }
  }

  cerrarChat() {
    this.mensajesService.toggleMenuMensajes();
  }

  openBlockModal() {
    this.showBlockModal = true;
  }

  openReportModal() {
    this.showReportModal = true;
  }

  blockUser() {
    // Implementar lógica de bloqueo
    this.showBlockModal = false;
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
