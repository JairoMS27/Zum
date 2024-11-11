import { Component } from '@angular/core';

@Component({
  selector: 'app-terminos',
  templateUrl: './terminos.component.html',
  styleUrl: './terminos.component.css',
})
export class TerminosComponent {
  mostrarMenu = false;

  desplegarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
