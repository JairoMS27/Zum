import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(private router: Router) {}

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

  // Este método pecha a sesión eliminando os datos do usuario de sessionStorage
  pecharSesion(): void {
    sessionStorage.removeItem('usuario'); // Eliminamos a entrada "usuario" de sessionStorage
    this.router.navigate(['/']); // Rediriximos á páxina de login
  }

  ngOnInit() {
    const usuario = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    this.rol = usuario.rol || null;
    this.usuario = usuario.usuario || null;
  }
}
