import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

export interface Notificacion {
  id: number;
  tipo: 'mensaje' | 'match' | 'premium' | 'compra';
  titulo: string;
  contenido: string;
  fecha: Date;
  leida: boolean;
  icono: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private notificaciones = new BehaviorSubject<Notificacion[]>([]);
  private contadorNoLeidas = new BehaviorSubject<number>(0);

  constructor() {
    this.cargarNotificaciones();
  }

  private cargarNotificaciones() {
    const notificacionesGuardadas = sessionStorage.getItem('notificaciones');
    if (notificacionesGuardadas) {
      const notificaciones = JSON.parse(notificacionesGuardadas);
      this.notificaciones.next(notificaciones);
      this.actualizarContador();
    }
  }

  private guardarNotificaciones() {
    sessionStorage.setItem('notificaciones', JSON.stringify(this.notificaciones.value));
  }

  private actualizarContador() {
    const noLeidas = this.notificaciones.value.filter(n => !n.leida).length;
    this.contadorNoLeidas.next(noLeidas);
  }

  getNotificaciones(): Observable<Notificacion[]> {
    return this.notificaciones.asObservable();
  }

  getContadorNoLeidas(): Observable<number> {
    return this.contadorNoLeidas.asObservable();
  }

  agregarNotificacion(tipo: 'mensaje' | 'match' | 'premium' | 'compra', titulo: string, contenido: string) {
    const iconos = {
      mensaje: 'message',
      match: 'favorite',
      premium: 'stars',
      compra: 'shopping_cart'
    };

    const nuevaNotificacion: Notificacion = {
      id: Date.now(),
      tipo,
      titulo,
      contenido,
      fecha: new Date(),
      leida: false,
      icono: iconos[tipo]
    };

    const notificacionesActuales = this.notificaciones.value;
    this.notificaciones.next([nuevaNotificacion, ...notificacionesActuales]);
    this.actualizarContador();
    this.guardarNotificaciones();
  }

  marcarComoLeida(id: number) {
    const notificacionesActualizadas = this.notificaciones.value.map(notif => {
      if (notif.id === id) {
        return { ...notif, leida: true };
      }
      return notif;
    });

    this.notificaciones.next(notificacionesActualizadas);
    this.actualizarContador();
    this.guardarNotificaciones();
  }

  marcarTodasComoLeidas() {
    const notificacionesActualizadas = this.notificaciones.value.map(notif => ({
      ...notif,
      leida: true
    }));

    this.notificaciones.next(notificacionesActualizadas);
    this.actualizarContador();
    this.guardarNotificaciones();
  }

  eliminarNotificacion(id: number) {
    const notificacionesActualizadas = this.notificaciones.value.filter(notif => notif.id !== id);
    this.notificaciones.next(notificacionesActualizadas);
    this.actualizarContador();
    this.guardarNotificaciones();
  }

  eliminarTodasNotificaciones() {
    this.notificaciones.next([]);
    this.actualizarContador();
    this.guardarNotificaciones();
  }

  // Métodos específicos para cada tipo de notificación
  notificarMensaje(remitente: string) {
    this.agregarNotificacion(
      'mensaje',
      'Nuevo mensaje',
      `Has recibido un mensaje de ${remitente}`
    );
  }

  notificarMatch(usuario: string) {
    this.agregarNotificacion(
      'match',
      '¡Nuevo match!',
      `Has hecho match con ${usuario}`
    );
  }

  notificarSuscripcionPremium(tipo: string) {
    this.agregarNotificacion(
      'premium',
      'Suscripción Premium',
      `Te has suscrito exitosamente al plan ${tipo}`
    );
  }

  notificarCompra(producto: string) {
    this.agregarNotificacion(
      'compra',
      'Compra exitosa',
      `Has comprado ${producto}`
    );
  }
} 