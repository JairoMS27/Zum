import { Component, OnInit } from '@angular/core';
import { EtiquetasService } from '../etiquetas-servizo.service';
import { Etiqueta } from '../etiqueta';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  mostrarMenu = false;
  usuario: any = {
    ficha: {
      fotoPerfil: 'https://i.imgur.com/HeIi0wU.png',
      nombre: '',
      apellidos: '',
      descripcion: '',
      ubicacion: '',
      genero: '',
      orientacion: '',
      etiquetas: [],
      juegosFavoritos: [],
      animesFavoritos: [],
      steam: false,
      aniList: false,
      discord: '',
      xbox: '',
      playstation: '',
      premium: {
        activo: false,
        tipo: '', // 'pro' o 'premium'
        mostrarIcono: true,
        colorNombre: '#000000'
      }
    }
  };
  etiquetasPorCategoria: { [key: string]: Etiqueta[] } = {};
  categoriasTraducidas: Record<string, string> = {
    personalidad: 'Personalidad',
    intereses: 'Intereses generales',
    gaming: 'Gaming',
    anime: 'Anime y manga',
    social: 'Social'
  };
  juegosDisponibles: string[] = [];
  animesDisponibles: string[] = [];
  objectKeys = Object.keys;

  constructor(
    private etiquetasService: EtiquetasService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
      if (!this.usuario.ficha) {
        this.usuario.ficha = {
          fotoPerfil: 'https://i.imgur.com/HeIi0wU.png',
          nombre: '',
          apellidos: '',
          descripcion: '',
          ubicacion: '',
          genero: '',
          orientacion: '',
          etiquetas: [],
          juegosFavoritos: [],
          animesFavoritos: [],
          steam: false,
          aniList: false,
          discord: '',
          xbox: '',
          playstation: '',
          premium: {
            activo: false,
            tipo: '', // 'pro' o 'premium'
            mostrarIcono: true,
            colorNombre: '#000000'
          }
        };
      }
    }
    this.etiquetasPorCategoria = this.etiquetasService.obtenerEtiquetasPorCategoria();
  }

  limitarSeleccion(event: any, tipo: 'juegos' | 'animes') {
    const seleccion = tipo === 'juegos' ? this.usuario.ficha.juegosFavoritos : this.usuario.ficha.animesFavoritos;
    if (seleccion.length > 3) {
      if (tipo === 'juegos') {
        this.usuario.ficha.juegosFavoritos = seleccion.slice(0, 3);
      } else {
        this.usuario.ficha.animesFavoritos = seleccion.slice(0, 3);
      }
    }
  }

  // Funciones de Steam
  conectarSteam() {
    console.log('Conectando con Steam...');
    this.usuario.ficha.steam = true;
    this.actualizarJuegosSteam();
  }

  desconectarSteam() {
    console.log('Desconectando Steam...');
    this.usuario.ficha.steam = false;
    this.usuario.ficha.juegosFavoritos = [];
  }

  actualizarJuegosSteam() {
    console.log('Actualizando juegos de Steam...');
    this.juegosDisponibles = ['Counter-Strike 2', 'Dota 2', 'PUBG', 'GTA V', 'Apex Legends'];
  }

  // Funciones de AniList
  conectarAniList() {
    console.log('Conectando con AniList...');
    this.usuario.ficha.aniList = true;
    this.actualizarAnimes();
  }

  desconectarAniList() {
    console.log('Desconectando AniList...');
    this.usuario.ficha.aniList = false;
    this.usuario.ficha.animesFavoritos = [];
  }

  actualizarAnimes() {
    console.log('Actualizando animes de AniList...');
    this.animesDisponibles = ['One Piece', 'Naruto', 'Dragon Ball', 'Death Note', 'Attack on Titan'];
  }

  guardarCambios() {
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
    
    // Verificar campos faltantes
    const camposFaltantes = this.verificarCamposFaltantes();
    
    if (camposFaltantes.length > 0) {
      this.snackBar.open(
        'Campos pendientes por completar: ' + camposFaltantes.join(', '), 
        'OK', 
        {
          duration: 5000,
          horizontalPosition: 'center',
          verticalPosition: 'bottom',
          panelClass: ['warning-snackbar']
        }
      );
    } else {
      this.snackBar.open('¡Perfil completado y guardado con éxito!', 'OK', {
        duration: 3000,
        horizontalPosition: 'center',
        verticalPosition: 'bottom',
        panelClass: ['success-snackbar']
      });
    }
  }

  verificarCamposFaltantes(): string[] {
    const camposRequeridos = {
      nombre: 'Nombre',
      apellidos: 'Apellidos',
      ubicacion: 'Ciudad',
      genero: 'Género',
      orientacion: 'Orientación',
      descripcion: 'Descripción',
      etiquetas: 'Etiquetas de interés'
    };

    const faltantes: string[] = [];
    
    for (const [campo, nombre] of Object.entries(camposRequeridos)) {
      if (!this.usuario.ficha[campo] || 
          (typeof this.usuario.ficha[campo] === 'string' && this.usuario.ficha[campo].trim() === '') ||
          (Array.isArray(this.usuario.ficha[campo]) && this.usuario.ficha[campo].length === 0)) {
        faltantes.push(nombre);
      }
    }

    return faltantes;
  }

  onImagenSeleccionada(event: any) {
    const file = event.target.files[0];
    if (file) {
      const esGif = file.type === 'image/gif';
      if (esGif && !this.usuario.ficha.premium.activo) {
        this.snackBar.open('Solo los usuarios Premium pueden usar GIFs como foto de perfil', 'OK', {
          duration: 3000,
          panelClass: ['warning-snackbar']
        });
        return;
      }

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.usuario.ficha.fotoPerfil = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  toggleEtiqueta(etiqueta: Etiqueta) {
    const index = this.usuario.ficha.etiquetas.findIndex((e: Etiqueta) => e.nombre === etiqueta.nombre);
    if (index === -1) {
      if (this.usuario.ficha.etiquetas.length >= 5) {
        this.snackBar.open('Máximo 5 etiquetas permitidas', 'OK', {
          duration: 3000,
          panelClass: ['warning-snackbar']
        });
        return;
      }
      this.usuario.ficha.etiquetas.push(etiqueta);
    } else {
      this.usuario.ficha.etiquetas.splice(index, 1);
    }
  }

  isEtiquetaSeleccionada(etiqueta: Etiqueta): boolean {
    return this.usuario.ficha.etiquetas.some((e: Etiqueta) => e.nombre === etiqueta.nombre);
  }
}
