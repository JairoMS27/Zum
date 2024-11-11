import { Component } from '@angular/core';

@Component({
  selector: 'app-pase-batalla',
  templateUrl: './pase-batalla.component.html',
  styleUrl: './pase-batalla.component.css',
})
export class PaseBatallaComponent {
  mostrarMenu = false; // Variable para mostrar el menú

  // Método para desplegar el menú
  desplegarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
