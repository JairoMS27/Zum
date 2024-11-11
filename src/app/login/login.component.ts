import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServizoLoginService } from '../servizo-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  usuario = new FormControl('', [Validators.required]);
  contrasena = new FormControl('', [Validators.required]);
  errorUsuario = '';
  errorContrasena = '';

  constructor(
    private router: Router,
    private servizoLoginService: ServizoLoginService
  ) {}

  // Método para enviar el formulario
  enviarFormulario(event: Event) {
    event.preventDefault();
    this.errorUsuario = '';
    this.errorContrasena = '';

    if (!this.usuario.valid) {
      this.errorUsuario = 'Por favor, introduce un nombre de usuario.';
    } else if (!this.contrasena.valid) {
      this.errorContrasena = 'Por favor, introduce una contraseña.';
    } else {
      const usuario = this.servizoLoginService.usuarios.find(
        (u) => u.usuario === this.usuario.value
      );

      if (usuario) {
        if (usuario.contrasena === this.contrasena.value) {
          // Si el inicio de sesión es exitoso, guarda los datos de inicio de sesión en el almacenamiento web
          if (this.usuario.value !== null) {
            sessionStorage.setItem('usuario', JSON.stringify(usuario));
          }

          // Redirige a la ruta /portada
          this.router.navigate(['/portada']);
        } else {
          this.errorContrasena = 'Contraseña incorrecta.';
        }
      } else {
        this.errorUsuario = 'Usuario incorrecto.';
        this.errorContrasena = 'Contraseña incorrecta.';
      }
    }
  }
}
