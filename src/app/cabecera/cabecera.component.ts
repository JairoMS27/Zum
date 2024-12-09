import { Component, Output, EventEmitter, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { NotificacionesService, Notificacion } from '../notificaciones-servizo.service';
import { MensajesService } from '../mensajes.service';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css'],
  animations: [
    trigger('slideAnimation', [
      state('*', style({
        transform: 'translateX(0)'
      })),
      state('void', style({
        transform: 'translateX(-100%)'
      })),
      transition(':leave', [
        animate('300ms ease-out', style({
          transform: 'translateX(100%)',
          height: 0,
          opacity: 0
        }))
      ])
    ])
  ]
})
export class CabeceraComponent implements OnInit, OnDestroy {
  isMovil = false;
  menuAbierto = false;
  estaMenuAbierto = false;
  estaMenuMensajesAbierto = false;
  estaMenuNotificacionesAbierto = false;
  @Output() desplegarMenu = new EventEmitter<boolean>();
  rol: string | null = null;
  usuario: string | null = null;
  fotoPerfil: string | null = null;
  noleidosContador: number = 0;
  notificaciones: Notificacion[] = [];
  private subscripciones: Subscription[] = [];

  constructor(
    private router: Router,
    private servicioNotificaciones: NotificacionesService,
    private mensajesService: MensajesService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMovil = window.innerWidth <= 768;
  }

  ngOnInit() {
    this.isMovil = window.innerWidth <= 768;
    
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuario = JSON.parse(usuarioGuardado);
      this.rol = usuario.rol || null;
      this.usuario = usuario.usuario || null;
      this.fotoPerfil = usuario.ficha?.fotoPerfil || 'https://i.imgur.com/HeIi0wU.png';
    }

    this.subscripciones.push(
      this.servicioNotificaciones.getNotificaciones().subscribe(
        notificaciones => this.notificaciones = notificaciones
      ),
      this.servicioNotificaciones.getContadorNoLeidas().subscribe(
        contador => this.noleidosContador = contador
      ),
      this.mensajesService.menuMensajesAbierto$.subscribe(
        abierto => this.estaMenuMensajesAbierto = abierto
      )
    );
  }

  ngOnDestroy() {
    this.subscripciones.forEach(sub => sub.unsubscribe());
  }

  toggleMenu() {
    this.menuAbierto = !this.menuAbierto;
  }

  desplegarMenuMensajes() {
    this.mensajesService.toggleMenuMensajes();
    this.desplegarMenu.emit(this.estaMenuMensajesAbierto);
  }

  marcarComoLeida(notificacion: Notificacion) {
    this.servicioNotificaciones.marcarComoLeida(notificacion.id);
  }

  marcarTodasComoLeidas() {
    this.servicioNotificaciones.marcarTodasComoLeidas();
  }

  eliminarNotificacion(id: number) {
    this.servicioNotificaciones.eliminarNotificacion(id);
  }

  eliminarTodasNotificaciones() {
    this.servicioNotificaciones.eliminarTodasNotificaciones();
  }

  pecharSesion(): void {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('notificaciones');
    this.router.navigate(['/']);
  }
}
