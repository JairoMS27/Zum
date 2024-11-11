import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  constructor() { }

  obtenerNoLeidas(): Observable<number> {
    // Por ahora retornamos un valor de prueba
    // Aquí posteriormente puedes implementar la lógica real para obtener las notificaciones no leídas
    return of(1);
  }

  marcarTodasComoLeidas() {
    return new Observable(observer => {
      observer.next();
      observer.complete();
    });
  }
} 