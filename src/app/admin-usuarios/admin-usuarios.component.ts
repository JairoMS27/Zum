import { Component, OnInit, HostListener } from '@angular/core';
import { ServizoLoginService } from '../servizo-login.service';
import { Usuario } from '../login';

@Component({
  selector: 'app-admin-usuarios',
  templateUrl: './admin-usuarios.component.html',
  styleUrl: './admin-usuarios.component.css',
})
export class AdminUsuariosComponent implements OnInit {
  // Define un array de usuarios y lo inicializa como un array vacío
  usuarios: Usuario[] = [];
  // Define una variable booleana para controlar si se muestra o no el modal
  abrirModal = false;
  // Define una variable para el usuario que se está editando y la inicializa como null
  usuarioEditar: Usuario | null = null;

  constructor(private servizoLoginService: ServizoLoginService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit() {
    // Llama al método cargarUsuarios del servicio y se suscribe al Observable que devuelve
    this.servizoLoginService.cargarUsuarios().subscribe((respuesta) => {
      // Asigna la lista de usuarios devuelta por el servicio a la variable usuarios del componente
      this.usuarios = respuesta.usuarios;
    });
  }

  // Método para crear un nuevo usuario
  crearUsuario(nombreUsuario: string, contrasena: string, rol: string) {
    // Crea un nuevo objeto Usuario
    const nuevoUsuario: Usuario = {
      usuario: nombreUsuario,
      contrasena: contrasena,
      matches: [],
      likes: 5,
      superZuums: 0,
      premium: false,
      rol: rol,
    };
    // Llama al método agregarUsuario del servicio y pasa el nuevo usuario como argumento
    const usuarioCreado = this.servizoLoginService.agregarUsuario(nuevoUsuario);
    // Si el usuario no se ha creado muestra una alerta y termina
    if (!usuarioCreado) {
      alert('El nombre de usuario ya existe');
      return;
    }
    // Actualiza la lista de usuarios del componente con la lista de usuarios del servicio
    this.usuarios = this.servizoLoginService.usuarios;
    this.abrirModal = false;
  }

  // Método para abrir el modal de edición de usuario
  abrirModalEditar(usuario: Usuario) {
    // Asigna una copia del usuario a editar a la variable usuarioEditar del componente
    this.usuarioEditar = { ...usuario };
    this.abrirModal = true;
  }

  // Método para editar un usuario
  editarUsuario() {
    // Si hay un usuario a editar
    if (this.usuarioEditar) {
      // Llama al método editarUsuario del servicio y pasa el usuario a editar como argumento
      this.servizoLoginService.editarUsuario(
        this.usuarioEditar,
        this.usuarioEditar
      );
      // Actualiza la lista de usuarios del componente con la lista de usuarios del servicio
      this.usuarios = this.servizoLoginService.usuarios;
      // Resetea la variable usuarioEditar a null
      this.usuarioEditar = null;
      this.abrirModal = false;
    }
  }

  // Método para eliminar un usuario
  eliminarUsuario(usuario: Usuario) {
    // Llama al método eliminarUsuario del servicio y pasa el usuario a eliminar como argumento
    this.servizoLoginService.eliminarUsuario(usuario);
    // Actualiza la lista de usuarios del componente con la lista de usuarios del servicio
    this.usuarios = this.servizoLoginService.usuarios;
  }

  // Método para manejar el evento de teclado
  @HostListener('document:keydown', ['$event'])
  manejarEventoTeclado(event: KeyboardEvent) {
    // Si la tecla pulsada es Escape
    if (event.key === 'Escape') {
      // Cierra el modal
      this.abrirModal = false;
      // Resetea la variable usuarioEditar a null
      this.usuarioEditar = null;
    }
  }

  // Método para cerrar el modal
  cerrarModal() {
    // Cierra el modal
    this.abrirModal = false;
    // Resetea la variable usuarioEditar a null
    this.usuarioEditar = null;
  }
}
