import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css'],
})
export class PremiumComponent {
  mostrarMenu = false; // Variable para mostrar el menú
  modalAbierto = false; // Variable para mostrar el modal
  esPremium: boolean = false; // Variable para saber si el usuario es premium

  // Formulario para el pago
  pagoForm = new FormGroup({
    numeroTarjeta: new FormControl('', Validators.required),
    fechaExpiracion: new FormControl('', Validators.required),
    cvv: new FormControl('', Validators.required),
  });

  // Método para desplegar el menú
  desplegarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  // Método para saber si el usuario es premium
  esUsuarioPremium() {
    const usuarioJSON = sessionStorage.getItem('usuario');
    if (usuarioJSON !== null) {
      const usuario = JSON.parse(usuarioJSON);
      return usuario.premium;
    }
    return false;
  }

  // Método para abrir el modal
  abrirModal() {
    if (this.esUsuarioPremium()) {
      this.esPremium = true;
    } else {
      this.modalAbierto = true;
    }
  }

  // Método para pagar
  pagar() {
    if (this.pagoForm.valid) { // Si el formulario es válido
      const usuarioJSON = sessionStorage.getItem('usuario'); // Recuperar el objeto del usuario de sessionStorage
      if (usuarioJSON !== null) { // Si hay un usuario guardado, recupéralo
        const usuario = JSON.parse(usuarioJSON); 
        usuario.premium = true; // Establecer el usuario como premium
        usuario.superZuums = usuario.superZuums + 5; // Añadir 5 superZuums al usuario
        sessionStorage.setItem('usuario', JSON.stringify(usuario)); // Guardar el usuario en sessionStorage
      }
      this.modalAbierto = false; // Cerrar el modal
    }
  }
}
