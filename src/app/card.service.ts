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
    this.http
      .get<{ tarjetas: Tarjeta[] }>('../assets/data/personas.json')
      .subscribe({
        next: (data) => {
          this.tarjetas = data.tarjetas;
          this.tarjetasCargadas.next(true);
        },
        error: (error) => {
          console.error('Error al cargar los perfiles:', error);
        },
      });
  }

  // Metodo para obtener la siguiente tarjeta
  getSiguienteTarjeta(): Observable<Tarjeta | null> {
    return this.tarjetasCargadas.pipe(
      switchMap((loaded) => {
        if (loaded && this.tarjetaActual < this.tarjetas.length) {
          const card = this.tarjetas[this.tarjetaActual];
          return of(card);
        } else {
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
