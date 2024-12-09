import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario, Usuarios } from './login';

@Injectable({
  providedIn: 'root',
})
export class ServizoLoginService {
  private rutaJson = '../assets/data/usuarios.json';
  // Define un array para almacenar los usuarios
  usuarios: Usuario[] = [];

  // Inyecta el servicio HttpClient en el constructor
  constructor(private http: HttpClient) {
    // Carga los usuarios al inicializar el servicio
    this.cargarUsuarios().subscribe();
  }

  // Método para cargar los usuarios desde el archivo JSON.
  // Este método devuelve un Observable que manda un objeto con una propiedad 'usuarios' que es un array de Usuario.
  cargarUsuarios(): Observable<{ usuarios: Usuario[] }> {
    // Realiza una petición HTTP GET al archivo JSON que definimos arriba
    // El método 'get' devuelve un Observable que emite el cuerpo de la respuesta como un objeto JSON.
    return this.http.get<{ usuarios: Usuario[] }>(this.rutaJson).pipe(
      // Esto significa que cada vez que alguien se suscribe a este Observable, 'this.usuarios' se actualizará con los usuarios más recientes.
      tap((data) => {
        this.usuarios = data.usuarios;
      })
    );
  }

  // Método para agregar un nuevo usuario
  agregarUsuario(usuario: Usuario): boolean {
    // Comprueba si ya existe un usuario con el mismo nombre
    const existeUsuario = this.usuarios.find(
      (u) => u.usuario === usuario.usuario
    );
    // Si existe, devuelve false
    if (existeUsuario) {
      return false;
    }

    // Si no existe, agrega el nuevo usuario al array y devuelve true
    this.usuarios.push(usuario);
    return true;
  }

  // Método para eliminar un usuario
  eliminarUsuario(usuario: Usuario) {
    // Encuentra el índice del usuario en el array
    const index = this.usuarios.findIndex((u) => u.usuario === usuario.usuario);
    // Si el usuario existe, lo elimina del array
    if (index !== -1) {
      this.usuarios.splice(index, 1);
    }
  }

  // Método para editar un usuario
  editarUsuario(usuarioOriginal: Usuario, usuarioEditado: Usuario) {
    // Encuentra el índice del usuario original en el array
    const index = this.usuarios.findIndex(
      (u) => u.usuario === usuarioOriginal.usuario
    );
    // Si el usuario existe, lo reemplaza con el usuario editado
    if (index !== -1) {
      this.usuarios[index] = usuarioEditado;
    }
  }
}
