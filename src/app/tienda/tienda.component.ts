import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionesService } from '../notificaciones-servizo.service';

interface Producto {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  precioOriginal?: number;
  descuento?: number;
  imagen: string;
  premium?: boolean;
  tipo?: 'skin' | 'like' | 'superlike';
  descuentoAplicado?: boolean;
  cantidad?: number;
}

@Component({
  selector: 'app-tienda',
  templateUrl: './tienda.component.html',
  styleUrls: ['./tienda.component.css'],
})
export class TiendaComponent implements OnInit {
  mostrarMenu = false;
  modalAbierto = false;
  productoSeleccionado: Producto | null = null;
  esPremium = false;
  tipoPremium = '';
  descuentoTienda = 0;
  usuario: any = null;

  cosmeticos: Producto[] = [
    {
      id: 1,
      nombre: 'Skin Dorada',
      descripcion: 'Una elegante skin dorada para tu perfil',
      precio: 15.99,
      imagen: 'assets/skins/golden.png',
      tipo: 'skin'
    },
    {
      id: 2,
      nombre: 'Skin Diamante',
      descripcion: 'Brilla con esta exclusiva skin de diamante',
      precio: 24.99,
      imagen: 'assets/skins/diamond.png',
      tipo: 'skin'
    }
  ];

  paquetesLikes: Producto[] = [
    { 
      id: 4, 
      nombre: '10 Likes',
      descripcion: 'Paquete de 10 likes',
      cantidad: 10, 
      precio: 4.99, 
      tipo: 'like',
      imagen: 'favorite'
    },
    { 
      id: 5, 
      nombre: '50 Likes',
      descripcion: 'Paquete de 50 likes',
      cantidad: 50, 
      precio: 19.99, 
      tipo: 'like',
      imagen: 'favorite'
    },
    { 
      id: 6, 
      nombre: '100 Likes',
      descripcion: 'Paquete de 100 likes',
      cantidad: 100, 
      precio: 34.99, 
      tipo: 'like',
      imagen: 'favorite'
    },
    { 
      id: 7, 
      nombre: '500 Likes',
      descripcion: 'Paquete de 500 likes',
      cantidad: 500, 
      precio: 149.99, 
      tipo: 'like',
      imagen: 'favorite'
    }
  ];

  paquetesSuperLikes: Producto[] = [
    { 
      id: 8, 
      nombre: '5 Super Likes',
      descripcion: 'Paquete de 5 super likes',
      cantidad: 5, 
      precio: 9.99, 
      tipo: 'superlike',
      imagen: 'auto_awesome'
    },
    { 
      id: 9, 
      nombre: '20 Super Likes',
      descripcion: 'Paquete de 20 super likes',
      cantidad: 20, 
      precio: 29.99, 
      tipo: 'superlike',
      imagen: 'auto_awesome'
    },
    { 
      id: 10, 
      nombre: '50 Super Likes',
      descripcion: 'Paquete de 50 super likes',
      cantidad: 50, 
      precio: 59.99, 
      tipo: 'superlike',
      imagen: 'auto_awesome'
    },
    { 
      id: 11, 
      nombre: '100 Super Likes',
      descripcion: 'Paquete de 100 super likes',
      cantidad: 100, 
      precio: 99.99, 
      tipo: 'superlike',
      imagen: 'auto_awesome'
    }
  ];

  cosmeticosPremium: Producto[] = [
    {
      id: 12,
      nombre: 'Marco Dorado',
      descripcion: 'Un elegante marco dorado para tu foto de perfil',
      precio: 19.99,
      imagen: 'assets/skins/marco-dorado.png',
      tipo: 'skin',
      premium: true
    },
    {
      id: 13,
      nombre: 'Efectos Especiales',
      descripcion: 'Añade efectos especiales a tu perfil',
      precio: 24.99,
      imagen: 'assets/skins/efectos.png',
      tipo: 'skin',
      premium: true
    }
  ];

  constructor(
    private snackBar: MatSnackBar,
    private servicioNotificaciones: NotificacionesService
  ) {}

  ngOnInit() {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
      this.esPremium = this.usuario.ficha?.premium?.activo || false;
      this.tipoPremium = this.usuario.ficha?.premium?.tipo || '';

      // Establecer descuento según el tipo de suscripción
      if (this.tipoPremium === 'premium') {
        this.descuentoTienda = 15;
      } else if (this.tipoPremium === 'pro') {
        this.descuentoTienda = 5;
      }

      // Aplicar descuentos a los productos
      this.aplicarDescuentos();
    }
  }

  aplicarDescuentos() {
    if (this.descuentoTienda > 0) {
      const aplicarDescuento = (producto: Producto) => {
        if (!producto.descuentoAplicado) {
          producto.precioOriginal = producto.precio;
          producto.precio = +(producto.precio * (1 - this.descuentoTienda / 100)).toFixed(2);
          producto.descuento = this.descuentoTienda;
          producto.descuentoAplicado = true;
        }
      };

      this.cosmeticos.forEach(aplicarDescuento);
      this.paquetesLikes.forEach(aplicarDescuento);
      this.paquetesSuperLikes.forEach(aplicarDescuento);
      this.cosmeticosPremium.forEach(aplicarDescuento);
    }
  }

  abrirModal(producto: Producto) {
    if (producto.premium && !this.esPremium) {
      this.snackBar.open('Este producto es exclusivo para usuarios Premium', 'OK', {
        duration: 3000,
        panelClass: ['warning-snackbar']
      });
      return;
    }
    this.productoSeleccionado = producto;
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
    this.productoSeleccionado = null;
  }

  procesarPago(metodoPago: 'paypal' | 'card') {
    if (!this.productoSeleccionado) {
      this.snackBar.open('Error al procesar el pago', 'OK', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    // Obtener usuario actualizado
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (!usuarioGuardado) {
      this.snackBar.open('Error: Usuario no encontrado', 'OK', {
        duration: 3000,
        panelClass: ['error-snackbar']
      });
      return;
    }

    this.usuario = JSON.parse(usuarioGuardado);

    // Simular proceso de pago
    this.snackBar.open('Procesando pago...', '', { duration: 1000 });

    setTimeout(() => {
      switch(this.productoSeleccionado?.tipo) {
        case 'skin':
          // Añadir skin al inventario
          if (!this.usuario.inventario) {
            this.usuario.inventario = [];
          }
          this.usuario.inventario.push(this.productoSeleccionado?.id);
          this.servicioNotificaciones.notificarCompra(this.productoSeleccionado.nombre);
          break;

        case 'like':
          // Añadir likes
          if (!this.usuario.likes) {
            this.usuario.likes = 0;
          }
          this.usuario.likes += this.productoSeleccionado?.cantidad || 0;
          this.servicioNotificaciones.notificarCompra(`${this.productoSeleccionado.cantidad} likes`);
          break;

        case 'superlike':
          // Añadir superZuums
          if (!this.usuario.superZuums) {
            this.usuario.superZuums = 0;
          }
          this.usuario.superZuums += this.productoSeleccionado?.cantidad || 0;
          this.servicioNotificaciones.notificarCompra(`${this.productoSeleccionado.cantidad} super likes`);
          break;
      }

      // Guardar cambios en sessionStorage
      sessionStorage.setItem('usuario', JSON.stringify(this.usuario));

      // Mostrar mensaje de éxito
      this.snackBar.open('¡Compra realizada con éxito!', 'OK', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });

      this.cerrarModal();
    }, 1500);
  }

  getPrecioConDescuento(precio: number): number {
    if (this.descuentoTienda > 0) {
      return +(precio * (1 - this.descuentoTienda / 100)).toFixed(2);
    }
    return precio;
  }
}
