import { Component, OnInit, OnDestroy } from '@angular/core';
import { MensajesService } from './mensajes.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  mostrarMenu = false;
  private subscription: Subscription;

  constructor(private mensajesService: MensajesService) {}

  ngOnInit() {
    this.subscription = this.mensajesService.menuMensajesAbierto$.subscribe(
      abierto => this.mostrarMenu = abierto
    );
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
