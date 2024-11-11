import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CardService } from '../card.service';
import { Observable, of, timer } from 'rxjs';
import { switchMap, delay } from 'rxjs/operators';
import {
  trigger,
  state,
  style,
  animate,
  transition,
} from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('deslizar', [
      state(
        'izquierda',
        style({
          transform: 'rotate(-20deg) translateY(-40%)',
        })
      ),
      state(
        'derecha',
        style({
          transform: 'rotate(20deg) translateY(-40%)',
        })
      ),
      state(
        'arriba',
        style({
          transform: 'translateY(-40%)',
        })
      ),
      transition('* => *', animate('500ms ease')),
    ]),
  ],
})
export class CardComponent implements OnInit {
  estaGirada = false; // Variable para controlar si la tarjeta está girada
  deslizarDireccion = ''; // Direccion del deslizamiento
  tarjetaActual: Observable<any>; // Propiedad para la tarjeta actual
  esMatch = false; // Variable para controlar si es un match
  imagenMatch: string | null = null; // Propiedad para la imagen del match
  mensaje: string;
  usuario: string;
  foto: string;
  @ViewChild('modalSinLikes') modalSinLikes: ElementRef;
  @ViewChild('modalSinSuperZuums') modalSinSuperZuums: ElementRef;

  constructor(private cardService: CardService, private ruta: Router) {
    this.tarjetaActual = of(null); // Asigna un valor inicial a tarjetaActual
  }

  // Metodo para cerrar modal del sin likes
  cerrarModalSinLikes() {
    this.modalSinLikes.nativeElement.classList.remove('is-active');
  }

  // Metodo para cerrar modal del sin superZuums
  cerrarModalSinSuperZuums() {
    this.modalSinSuperZuums.nativeElement.classList.remove('is-active');
  }

  // Metodo para animar la tarjeta
  animarTarjeta(direccion: string) {
    this.deslizarDireccion = direccion;
  }

  // Metodo para quitar la animacion
  quitarAnimacion() {
    this.deslizarDireccion = '';
  }

  // Metodo para reiniciar la direccion del deslizamiento
  resetDireccion() {
    this.deslizarDireccion = '';
  }

  // Metodo para inicializar la tarjeta
  ngOnInit() {
    this.getSiguienteTarjeta();
  }

  // Meotod para obtener la siguiente tarjeta
  getSiguienteTarjeta() {
    this.tarjetaActual = this.cardService.getSiguienteTarjeta();
  }

  // Metodo para girar la tarjeta
  girarTarjeta() {
    this.estaGirada = !this.estaGirada;
  }

  // Metodo para obtener los likes del usuario actual
  getLikesUsuarioActual() {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    return usuarioActual.likes || 0;
  }

  // Metodo para actualizar los likes del usuario actual
  actualizarLikesUsuarioActual(likes: number) {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    usuarioActual.likes = likes;
    sessionStorage.setItem('usuario', JSON.stringify(usuarioActual));
  }

  // Metodo para obtener los superZuums del usuario actual
  getSuperZuumsUsuarioActual() {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    return usuarioActual.superZuums || 0;
  }

  // Metodo para actualizar los superZuums del usuario actual
  actualizarSuperZuumsUsuarioActual(superZuums: number) {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    usuarioActual.superZuums = superZuums;
    sessionStorage.setItem('usuario', JSON.stringify(usuarioActual));
  }

  // Metodo para deslizar la tarjeta hacia la izquierda

  deslizarIzquierda() {
    // Establece la dirección de deslizamiento a 'izquierda' para iniciar la animación
    this.deslizarDireccion = 'izquierda';

    // Después de un retraso que coincide con la duración de la animación, restablece la dirección de deslizamiento y carga la siguiente tarjeta
    setTimeout(() => {
      this.deslizarDireccion = '';
      this.cardService.incrementarIndice();
      this.loadSiguienteTarjetaAfterDelay(250); // Ajusta este valor según la duración de la animación
    }, 500); // Ajusta este valor según la duración de la animación
  }

  // Método para deslizar la tarjeta hacia la derecha
  deslizarDerecha() {
    const usuarioActual = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    const esPremium = usuarioActual.premium;
    let likes = this.getLikesUsuarioActual();

    if (esPremium || likes > 0) {
      if (!esPremium) {
        likes--;
        this.actualizarLikesUsuarioActual(likes);
      }

      // Establece la dirección de deslizamiento a 'derecha' para iniciar la animación
      this.deslizarDireccion = 'derecha';

      // Obtiene el campo usuario del objeto usuario en la sesión
      const usuarioActual = JSON.parse(
        sessionStorage.getItem('usuario') || '{}'
      ).usuario;

      // Obtiene los matches del usuario de la tarjeta
      const matchesUsuarioTarjeta = this.cardService.getMatchesUsuarioTarjeta();

      // Comprueba si el nombre de usuario de la sesión actual está en el array de matches del usuario de la tarjeta
      this.tarjetaActual.subscribe((tarjeta) => {
        if (usuarioActual && matchesUsuarioTarjeta.includes(usuarioActual)) {
          // Si es un match, muestra un mensaje de match
          this.esMatch = true;
          this.imagenMatch = tarjeta.imagenURL;
        }
      });

      this.usuario = this.cardService.getUsuarioTarjetaActual(); // Obtiene el usuario de la tarjeta actual
      this.foto = this.cardService.getImagenTarjetaActual(); // Obtiene la foto de la tarjeta actual

      // Después de un retraso que coincide con la duración de la animación, restablece la dirección de deslizamiento y carga la siguiente tarjeta
      setTimeout(() => {
        this.deslizarDireccion = '';
        this.cardService.incrementarIndice();

        this.loadSiguienteTarjetaAfterDelay(250); // Ajusta este valor según la duración de la animación
      }, 500); // Ajusta este valor según la duración de la animación
    } else {
      this.modalSinLikes.nativeElement.classList.add('is-active');
    }
  }

  // Método para el superZuum
  superZuum() {
    let superZuums = this.getSuperZuumsUsuarioActual();
    if (superZuums > 0) {
      superZuums--;
      this.actualizarSuperZuumsUsuarioActual(superZuums);
      // Establece la dirección de deslizamiento a 'arriba' para iniciar la animación
      this.deslizarDireccion = 'arriba';

      // Obtiene el campo usuario del objeto usuario en la sesión
      const usuarioActual = JSON.parse(
        sessionStorage.getItem('usuario') || '{}'
      ).usuario;

      // Obtiene los matches del usuario de la tarjeta
      const matchesUsuarioTarjeta = this.cardService.getMatchesUsuarioTarjeta();

      // Comprueba si el nombre de usuario de la sesión actual está en el array de matches del usuario de la tarjeta
      this.tarjetaActual.subscribe((tarjeta) => {
        if (usuarioActual && matchesUsuarioTarjeta.includes(usuarioActual)) {
          // Si es un match, muestra un mensaje de match
          this.esMatch = true;
          this.imagenMatch = tarjeta.imagenURL;
        }
      });

      this.usuario = this.cardService.getUsuarioTarjetaActual(); // Obtiene el usuario de la tarjeta actual
      this.foto = this.cardService.getImagenTarjetaActual(); // Obtiene la foto de la tarjeta actual

      // Después de un retraso que coincide con la duración de la animación, restablece la dirección de deslizamiento y carga la siguiente tarjeta
      setTimeout(() => {
        this.deslizarDireccion = '';
        this.cardService.incrementarIndice();
        this.loadSiguienteTarjetaAfterDelay(250); // Ajusta este valor según la duración de la animación
      }, 500); // Ajusta este valor según la duración de la animación
    } else {
      this.modalSinSuperZuums.nativeElement.classList.add('is-active');
    }
  }

  // Método para cargar la siguiente tarjeta después de un retraso especificado
  loadSiguienteTarjetaAfterDelay(delay: number) {
    // Crea un temporizador que se dispara después del retraso especificado
    timer(delay)
      .pipe(
        // Devuelve un Observable que emite la siguiente tarjeta
        switchMap(() => this.cardService.getSiguienteTarjeta())
      )
      // Se suscribe al Observable resultante y asigna la tarjeta emitida a la propiedad tarjetaActual del componente y lo convierte en un Observable
      .subscribe((tarjeta) => (this.tarjetaActual = of(tarjeta)));
  }

  seguirDescubriendo() {
    this.esMatch = false;
  }

  enviarMensaje() {
    // Recuperar el objeto del usuario de sessionStorage
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuarioObj = JSON.parse(usuarioGuardado);

      // Si el objeto chats no existe, inicialízalo
      if (!usuarioObj.chats) {
        usuarioObj.chats = {};
      }

      // Si el usuario no tiene mensajes, inicializar un objeto con mensajes y foto
      if (!usuarioObj.chats[this.usuario]) {
        usuarioObj.chats[this.usuario] = {
          mensajes: [],
          foto: this.foto,
        };
      }

      // Agregar el mensaje al array de mensajes del usuario
      usuarioObj.chats[this.usuario].mensajes.push(this.mensaje);

      // Guardar el objeto actualizado en sessionStorage
      sessionStorage.setItem('usuario', JSON.stringify(usuarioObj));

      // Navegar a la ruta del chat del usuario
      this.ruta.navigate(['/mensajes/chats', this.usuario]);
    }

    // Limpiar el mensaje
    this.mensaje = '';
  }
}
