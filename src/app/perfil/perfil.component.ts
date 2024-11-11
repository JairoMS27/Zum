import { Component, OnInit } from '@angular/core';
import { EtiquetasService } from '../etiquetas-servizo.service';
import { Etiqueta } from '../etiqueta';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css'],
})
export class PerfilComponent implements OnInit {
  mostrarMenu = false; // Variable para mostrar el menú
  usuario: any; // Usuario que ha iniciado sesión
  etiquetas: Etiqueta[] = []; // Array de etiquetas

  constructor(private etiquetasService: EtiquetasService) {}

  // Método para desplegar el menú
  desplegarMenu() {
    this.mostrarMenu = !this.mostrarMenu;
  }

  // Al iniciar el componente obtenemos el usuario
  ngOnInit() {
    const usuarioGuardado = sessionStorage.getItem('usuario'); // Recuperar el objeto del usuario de sessionStorage
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado); // Si hay un usuario guardado, recupéralo
    } else {
      // Si no hay un usuario guardado, puedes redirigir al usuario a la página de inicio de sesión
      // o establecer el usuario a un objeto vacío o a un objeto con valores predeterminados
      this.usuario = { nombre: 'Invitado' };
    }
    this.etiquetas = this.etiquetasService.obtenerEtiquetas(); // Obtener las etiquetas
  }

  // Método para guardar los cambios en el usuario
  guardarCambios() {
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));
  }
}
