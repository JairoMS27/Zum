import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { Tarjeta } from './tarjeta';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  private tarjetas: Tarjeta[] = [];
  private tarjetaActual = 0;
  private tarjetasCargadas = new BehaviorSubject(false);

  constructor(private http: HttpClient) {
    this.cargarTarjetas();
  }

  // Metodo para cargar las tarjetas desde un archivo JSON
  cargarTarjetas() {
    // Realiza una solicitud HTTP GET para obtener el archivo JSON que contiene las tarjetas
    this.http
      .get<{ tarjetas: Tarjeta[] }>('../assets/data/personas.json')
      .subscribe({
        next: (data) => {
          // Asigna el array de tarjetas obtenido desde la respuesta HTTP a la propiedad 'tarjetas' del servicio
          this.tarjetas = data.tarjetas;
          // Lanza un evento para indicar que las tarjetas han sido cargadas
          this.tarjetasCargadas.next(true);
        },
        error: (error) => {
          // Registra el error en la consola
          console.error('Error al cargar los perfiles:', error);
        },
      });
  }

  // Metodo para obtener la siguiente tarjeta
  getSiguienteTarjeta(): Observable<Tarjeta | null> {
    // Se suscribe al Observable 'tarjetasCargadas'
    return this.tarjetasCargadas.pipe(
      // Una vez que las tarjetas estan cargadas se ejecuta el map
      switchMap((loaded) => {
        if (loaded && this.tarjetaActual < this.tarjetas.length) {
          const card = this.tarjetas[this.tarjetaActual];
          // Deuelve un observable que lanza la tarjeta
          return of(card);
        } else {
          // Si no hay mas tarjetas manda un observable null
          return of(null);
        }
      })
    );
  }

  // Método para incrementar el índice actual
  incrementarIndice() {
    if (this.tarjetaActual < this.tarjetas.length) {
      this.tarjetaActual++;
    }
  }

  // Método para obtener los matches del usuario de la tarjeta
  getMatchesUsuarioTarjeta(): string[] {
    // Comprueba si hay una tarjeta actual
    if (this.tarjetaActual < this.tarjetas.length) {
      // Si hay una tarjeta actual, devuelve los matches de esa tarjeta
      return this.tarjetas[this.tarjetaActual].matches;
    } else {
      // Si no hay una tarjeta actual, devuelve un array vacío
      return [];
    }
  }

  // Metodo para obtener el usuario de la tarjeta actual
  getUsuarioTarjetaActual(): string {
    // Comprobar de que hay una tarjeta
    if (this.tarjetaActual < this.tarjetas.length) {
      return this.tarjetas[this.tarjetaActual].usuario;
    } else {
      return '';
    }
  }

  // Metodo para obtener la foto de la tarjeta actual
  getImagenTarjetaActual(): string {
    // Comprobar de que hay una tarjeta
    if (this.tarjetaActual < this.tarjetas.length) {
      return this.tarjetas[this.tarjetaActual].imagenURL;
    } else {
      return '';
    }
  }
}
