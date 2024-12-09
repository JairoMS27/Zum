import { Injectable } from '@angular/core';
import { Etiqueta } from './etiqueta';

@Injectable({
  providedIn: 'root',
})
export class EtiquetasService {
  private etiquetasPredefinidas: { [key: string]: string[] } = {
    personalidad: [
      'Introvertido/a', 'Extrovertido/a', 'Creativo/a', 'Deportista',
      'Aventurero/a', 'Tranquilo/a', 'Gracioso/a', 'Intelectual'
    ],
    intereses: [
      'Gaming', 'Anime', 'Manga', 'Cosplay', 'Música', 'Cine',
      'Series', 'Literatura', 'Arte', 'Tecnología', 'Fotografía'
    ],
    gaming: [
      'PC Gaming', 'PlayStation', 'Xbox', 'Nintendo', 'Retro Gaming',
      'RPG', 'FPS', 'MOBA', 'MMO', 'Survival', 'Indie'
    ],
    anime: [
      'Shonen', 'Shojo', 'Seinen', 'Mecha', 'Slice of Life',
      'Romance', 'Fantasy', 'Horror', 'Sports', 'Isekai'
    ],
    social: [
      'Busco amistad', 'Busco pareja', 'Casual gaming', 'Competitivo',
      'Team player', 'Solo player', 'Voice chat', 'Discord'
    ]
  };

  constructor() {
    // Inicializar las etiquetas predefinidas si no existen
    if (!localStorage.getItem('etiquetas')) {
      const etiquetasIniciales: Etiqueta[] = [];
      for (const categoria in this.etiquetasPredefinidas) {
        this.etiquetasPredefinidas[categoria].forEach((nombre: string) => {
          etiquetasIniciales.push({
            nombre,
            categoria
          });
        });
      }
      localStorage.setItem('etiquetas', JSON.stringify(etiquetasIniciales));
    }
  }

  obtenerEtiquetasPorCategoria(): { [key: string]: Etiqueta[] } {
    const etiquetas = this.obtenerEtiquetas();
    const etiquetasPorCategoria: { [key: string]: Etiqueta[] } = {};
    
    etiquetas.forEach(etiqueta => {
      if (!etiquetasPorCategoria[etiqueta.categoria]) {
        etiquetasPorCategoria[etiqueta.categoria] = [];
      }
      etiquetasPorCategoria[etiqueta.categoria].push(etiqueta);
    });
    
    return etiquetasPorCategoria;
  }

  obtenerEtiquetas(): Etiqueta[] {
    return JSON.parse(localStorage.getItem('etiquetas') || '[]');
  }

  crearEtiqueta(etiqueta: Etiqueta) {
    const etiquetas = this.obtenerEtiquetas();
    etiquetas.push(etiqueta);
    localStorage.setItem('etiquetas', JSON.stringify(etiquetas));
  }

  actualizarEtiqueta(nombre: string, etiquetaActualizada: Etiqueta) {
    const etiquetas = this.obtenerEtiquetas();
    const index = etiquetas.findIndex((etiqueta) => etiqueta.nombre === nombre);
    if (index !== -1) {
      etiquetas[index] = etiquetaActualizada;
      localStorage.setItem('etiquetas', JSON.stringify(etiquetas));
    }
  }

  eliminarEtiqueta(nombre: string) {
    let etiquetas = this.obtenerEtiquetas();
    etiquetas = etiquetas.filter((etiqueta) => etiqueta.nombre !== nombre);
    localStorage.setItem('etiquetas', JSON.stringify(etiquetas));
  }
}
