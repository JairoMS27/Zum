import { Component } from '@angular/core';

@Component({
  selector: 'app-preguntas-frecuentes',
  templateUrl: './preguntas-frecuentes.component.html',
  styleUrl: './preguntas-frecuentes.component.css',
})
export class PreguntasFrecuentesComponent {
  mostrarMenu = false;

  desplegarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
