import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NotificacionesService } from '../notificaciones-servizo.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
})
export class CabeceraComponent implements OnInit {
  estaMenuAbierto = false;
  estaMenuMensajesAbierto = false;
  estaMenuNotificacionesAbierto = false; // Nueva propiedad para el menú de notificaciones
  @Output() desplegarMenu = new EventEmitter<boolean>();
  rol: string | null = null;
  usuario: string | null = null;
  fotoPerfil: string | null = null;
  noleidosContador: number = 0;
  notificaciones: any[] = [];

  constructor(private router: Router, private servicioNotificaciones: NotificacionesService) {}

  // Funcion para alternar el estado del menú
  alternarMenu() {
    this.estaMenuAbierto = !this.estaMenuAbierto;
  }

  // Funcion para desplegar el menú de mensajes
  desplegarMenuMensajes() {
    this.estaMenuMensajesAbierto = true;
    this.desplegarMenu.emit(this.estaMenuMensajesAbierto);
  }

  // Nueva función para alternar el estado del menú de notificaciones
  alternarMenuNotificaciones() {
    this.estaMenuNotificacionesAbierto = !this.estaMenuNotificacionesAbierto;
  }

  cargarNotificaciones() {
    // Aquí implementarías la lógica para cargar las notificaciones
    // Por ejemplo:
    this.servicioNotificaciones.obtenerNoLeidas().subscribe(
      (contador) => {
        this.noleidosContador = contador;
      }
    );
  }

  marcarTodasComoLeidas() {
    this.servicioNotificaciones.marcarTodasComoLeidas().subscribe(
      () => {
        this.noleidosContador = 0;
      }
    );
  }

  marcarComoLeida(notificacion: any): void {
    notificacion.read = true;
    this.noleidosContador = Math.max(0, this.noleidosContador - 1);
    // Aquí puedes agregar la lógica para actualizar en el backend si es necesario
  }

  // Este método pecha a sesión eliminando os datos do usuario de sessionStorage
  pecharSesion(): void {
    sessionStorage.removeItem('usuario'); // Eliminamos a entrada "usuario" de sessionStorage
    this.router.navigate(['/']); // Rediriximos á páxina de login
  }

  ngOnInit() {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    this.rol = usuario.rol || null;
    this.usuario = usuario.usuario || null;

    // Generar URL de UI Avatars usando el nombre de usuario
    if (this.usuario) {
      this.fotoPerfil = `https://ui-avatars.com/api/?name=${encodeURIComponent(this.usuario)}&background=random`;
    }
  }
}
