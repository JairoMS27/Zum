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
import { MatSnackBar } from '@angular/material/snack-bar';
import { MensajesService } from '../mensajes.service';
import { NotificacionesService } from '../notificaciones-servizo.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('deslizar', [
      state('derecha', style({ transform: 'translateX(150%)' })),
      state('izquierda', style({ transform: 'translateX(-150%)' })),
      state('centro', style({ transform: 'translateX(0)' })),
      transition('* => *', animate('300ms ease-out')),
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
  fichaCompleta = false;
  usuarioActual: any;
  camposFaltantes: string[] = [];
  @ViewChild('modalSinLikes') modalSinLikes: ElementRef;
  @ViewChild('modalSinSuperZuums') modalSinSuperZuums: ElementRef;

  constructor(
    private cardService: CardService,
    private router: Router,
    private snackBar: MatSnackBar,
    private mensajesService: MensajesService,
    private servicioNotificaciones: NotificacionesService
  ) {
    this.tarjetaActual = of(null);
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
    this.usuarioActual = JSON.parse(sessionStorage.getItem('usuario') || '{}');
    
    if (this.verificarFichaCompleta(this.usuarioActual.ficha)) {
      this.fichaCompleta = true;
      this.getSiguienteTarjeta();
    } else {
      this.snackBar.open('Necesitas completar tu perfil para ver otros usuarios', 'Ir a perfil', {
        duration: 5000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['warning-snackbar']
      })
    }
  }

  verificarFichaCompleta(ficha: any): boolean {
    if (!ficha) return false;
    
    const camposRequeridos = {
      nombre: 'Nombre',
      apellidos: 'Apellidos',
      ubicacion: 'Ciudad',
      genero: 'Género',
      orientacion: 'Orientación',
      descripcion: 'Descripción'
    };

    this.camposFaltantes = [];
    
    // Verificar campos básicos
    for (const [campo, nombre] of Object.entries(camposRequeridos)) {
      if (!ficha[campo] || 
          (typeof ficha[campo] === 'string' && ficha[campo].trim() === '')) {
        this.camposFaltantes.push(nombre);
        return false;
      }
    }

    // Verificar etiquetas (al menos 1 etiqueta)
    if (!ficha.etiquetas || !Array.isArray(ficha.etiquetas) || ficha.etiquetas.length === 0) {
      this.camposFaltantes.push('Etiquetas de interés');
      return false;
    }

    return true;
  }

  // Meotod para obtener la siguiente tarjeta
  getSiguienteTarjeta() {
    this.tarjetaActual = this.cardService.getSiguienteTarjeta();
    this.usuario = this.cardService.getUsuarioTarjetaActual();
    this.foto = this.cardService.getImagenTarjetaActual();
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
    this.deslizarDireccion = 'izquierda';
    setTimeout(() => {
      this.cardService.incrementarIndice();
      this.getSiguienteTarjeta();
      this.deslizarDireccion = 'inicial';
    }, 300);
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
  
      this.deslizarDireccion = 'derecha';
      
      // Verificar match
      const usuarioActual = JSON.parse(sessionStorage.getItem('usuario') || '{}').usuario;
      const matchesUsuarioTarjeta = this.cardService.getMatchesUsuarioTarjeta();
  
      this.tarjetaActual.subscribe((tarjeta) => {
        if (usuarioActual && matchesUsuarioTarjeta.includes(usuarioActual)) {
          setTimeout(() => {
            this.esMatch = true;
            this.imagenMatch = tarjeta.imagenURL;
            this.usuario = tarjeta.usuario;
            this.foto = tarjeta.imagenURL;
          }, 300);
        } else {
          setTimeout(() => {
            this.cardService.incrementarIndice();
            this.getSiguienteTarjeta();
            this.deslizarDireccion = 'inicial';
          }, 300);
        }
      });
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
      
      this.deslizarDireccion = 'arriba';
      
      // Verificar match
      const usuarioActual = JSON.parse(sessionStorage.getItem('usuario') || '{}').usuario;
      const matchesUsuarioTarjeta = this.cardService.getMatchesUsuarioTarjeta();
  
      this.tarjetaActual.subscribe((tarjeta) => {
        if (usuarioActual && matchesUsuarioTarjeta.includes(usuarioActual)) {
          setTimeout(() => {
            this.esMatch = true;
            this.imagenMatch = tarjeta.imagenURL;
            this.usuario = tarjeta.usuario;
            this.foto = tarjeta.imagenURL;
          }, 300);
        } else {
          setTimeout(() => {
            this.cardService.incrementarIndice();
            this.getSiguienteTarjeta();
            this.deslizarDireccion = 'inicial';
          }, 300);
        }
      });
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
    // Agregar el match a los chats si no existe
    const nuevoMensaje = {
      texto: '¡Has hecho match! 🎉 Inicia una conversación para conoceros mejor.',
      hora: new Date(),
      sistema: true
    };

    this.mensajesService.agregarMensaje(
      this.usuario,
      nuevoMensaje,
      this.foto
    );

    // Continuar con la siguiente tarjeta
    this.esMatch = false;
    this.deslizarDireccion = 'inicial';
    this.cardService.incrementarIndice();
    this.getSiguienteTarjeta();
  }

  enviarMensaje() {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      const usuarioObj = JSON.parse(usuarioGuardado);

      // Crear el objeto mensaje con texto y hora
      const nuevoMensaje = {
        texto: this.mensaje,
        hora: new Date()
      };

      // Usar el servicio para agregar el mensaje
      this.mensajesService.agregarMensaje(
        this.usuario,
        nuevoMensaje,
        this.foto
      );

      // Mostrar snackbar
      this.snackBar.open('¡Mensaje enviado!', 'Cerrar', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom'
      });

      // Limpiar el mensaje y continuar con la siguiente tarjeta
      this.mensaje = '';
      this.esMatch = false;
      this.deslizarDireccion = 'inicial';
      this.cardService.incrementarIndice();
      this.getSiguienteTarjeta();
    }
  }

  private verificarMatch() {
    const matchesUsuarioTarjeta = this.cardService.getMatchesUsuarioTarjeta();
    const usuarioTarjeta = this.cardService.getUsuarioTarjetaActual();
    const foto = this.cardService.getImagenTarjetaActual();

    if (matchesUsuarioTarjeta.includes(this.usuario)) {
      this.esMatch = true;
      this.usuario = usuarioTarjeta;
      this.foto = foto;

      // Agregar notificación de match
      this.servicioNotificaciones.notificarMatch(usuarioTarjeta);

      // Inicializar chat
      this.mensajesService.agregarMensaje(
        usuarioTarjeta,
        {
          texto: '¡Has hecho match! Di hola 👋',
          hora: new Date(),
          sistema: true
        },
        foto
      );
    }
  }
}