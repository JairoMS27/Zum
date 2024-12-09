import { Injectable } from '@angular/core';
import { Cosmetico } from './cosmetico';

@Injectable({
  providedIn: 'root'
})
export class CosmeticosService {
  constructor() { }

  // Método para crear un cosmético
  crearCosmetico(cosmetico: Cosmetico) {
    const cosmeticos = JSON.parse(localStorage.getItem('cosmeticos') || '[]');
    cosmeticos.push(cosmetico);
    localStorage.setItem('cosmeticos', JSON.stringify(cosmeticos));
  }

  // Método para obtener los cosméticos
  obtenerCosmeticos(): Cosmetico[] {
    return JSON.parse(localStorage.getItem('cosmeticos') || '[]');
  }

  // Método para obtener un cosmético por su nombre
  actualizarCosmetico(nombre: string, cosmeticoActualizado: Cosmetico) {
    const cosmeticos = this.obtenerCosmeticos();
    const index = cosmeticos.findIndex(cosmetico => cosmetico.nombre === nombre);
    if (index !== -1) {
      cosmeticos[index] = cosmeticoActualizado;
      localStorage.setItem('cosmeticos', JSON.stringify(cosmeticos));
    }
  }

  // Método para eliminar un cosmético por su nombre
  eliminarCosmetico(nombre: string) { 
    let cosmeticos = this.obtenerCosmeticos(); 
    cosmeticos = cosmeticos.filter(cosmetico => cosmetico.nombre !== nombre); 
    localStorage.setItem('cosmeticos', JSON.stringify(cosmeticos));
  }
}
