import { Component } from '@angular/core';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrl: './preferencias.component.css',
})
export class PreferenciasComponent {
  mostrarMenu = false;

  desplegarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
