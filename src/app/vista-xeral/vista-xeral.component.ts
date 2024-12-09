import { Component } from '@angular/core';
import { MensajesService } from '../mensajes.service';

@Component({
  selector: 'app-vista-xeral',
  templateUrl: './vista-xeral.component.html',
  styleUrls: ['./vista-xeral.component.css']
})
export class VistaXeralComponent {
  mostrarMenu = false;

  constructor(private mensajesService: MensajesService) {
    this.mensajesService.menuMensajesAbierto$.subscribe(
      abierto => this.mostrarMenu = abierto
    );
  }
}
