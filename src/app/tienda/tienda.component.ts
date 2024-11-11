import { Component } from '@angular/core';
import { Cosmetico } from '../cosmetico';

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrl: './tienda.component.css',
})
export class TiendaComponent {
  mostrarMenu = false; // Variable para mostrar el menú
  productoSeleccionado = {
    // Producto seleccionado
    nombre: '',
    precio: '',
    imagen: '',
    descripcion: '',
  };
  modalAbierto = false; // Variable para mostrar el modal
  productos: Cosmetico[] = []; // Array de productos

  constructor() {
    const productosGuardados = localStorage.getItem('cosmeticos'); // Recuperar los productos de localStorage

    if (productosGuardados) {
      // Si hay productos guardados, recupéralos
      this.productos = JSON.parse(productosGuardados);
    }
  }

  get cosmeticos() {
    // Método para obtener los cosméticos
    return this.productos.filter((producto) => producto.tipo === 'Cosmetico');
  }

  get superZuums() {
    // Método para obtener los SuperZuums
    return this.productos.filter((producto) => producto.tipo === 'SuperZuums');
  }

  desplegarMenu() {
    // Método para desplegar el menú
    this.mostrarMenu = !this.mostrarMenu;
  }

  abrirModal(
    // Método para abrir el modal
    nombre: string,
    precio: string,
    imagen: string,
    descripcion: string
  ) {
    this.productoSeleccionado = { nombre, precio, imagen, descripcion }; // Establecer el producto seleccionado
    this.modalAbierto = true;
  }

  cerrarModal() {
    // Método para cerrar el modal
    this.modalAbierto = false;
  }
}
