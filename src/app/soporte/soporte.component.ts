import { Component } from '@angular/core';

@Component({
  selector: 'app-soporte',
  templateUrl: './soporte.component.html',
  styleUrl: './soporte.component.css',
})
export class SoporteComponent {
  mostrarMenu = false;

  desplegarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
