import { Component } from '@angular/core';

@Component({
  selector: 'vista-xeral',
  templateUrl: './vista-xeral.component.html',
  styleUrls: ['./vista-xeral.component.css'],
})
export class VistaXeralComponent {
  mostrarMenu = false;

  desplegarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }
}
