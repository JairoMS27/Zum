import { Injectable } from '@angular/core';
import { Etiqueta } from './etiqueta';

@Injectable({
  providedIn: 'root',
})
export class EtiquetasService {
  constructor() {}

  // Método para crear una etiqueta
  crearEtiqueta(etiqueta: Etiqueta) {
    const etiquetas = JSON.parse(localStorage.getItem('etiquetas') || '[]');
    etiquetas.push(etiqueta);
    localStorage.setItem('etiquetas', JSON.stringify(etiquetas));
  }

  // Método para obtener las etiquetas
  obtenerEtiquetas(): Etiqueta[] {
    return JSON.parse(localStorage.getItem('etiquetas') || '[]');
  }

  // Método para obtener una etiqueta por su nombre
  actualizarEtiqueta(nombre: string, etiquetaActualizada: Etiqueta) {
    const etiquetas = this.obtenerEtiquetas();
    const index = etiquetas.findIndex((etiqueta) => etiqueta.nombre === nombre);
    if (index !== -1) {
      etiquetas[index] = etiquetaActualizada;
      localStorage.setItem('etiquetas', JSON.stringify(etiquetas));
    }
  }

  // Método para eliminar una etiqueta por su nombre
  eliminarEtiqueta(nombre: string) {
    let etiquetas = this.obtenerEtiquetas();
    etiquetas = etiquetas.filter((etiqueta) => etiqueta.nombre !== nombre);
    localStorage.setItem('etiquetas', JSON.stringify(etiquetas));
  }
}
