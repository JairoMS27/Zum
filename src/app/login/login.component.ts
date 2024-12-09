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
      this.errorUsuario = 'El campo usuario es obligatorio';
      this.usuario.markAsTouched();
      return;
    }

    if (!this.contrasena.valid) {
      this.errorContrasena = 'El campo contraseña es obligatorio';
      this.contrasena.markAsTouched();
      return;
    }

    const usuario = this.servizoLoginService.usuarios.find(
      (u) => u.usuario === this.usuario.value
    );

    if (!usuario) {
      this.errorUsuario = 'El usuario no existe';
      this.usuario.setErrors({'incorrect': true});
      return;
    }

    if (usuario.contrasena !== this.contrasena.value) {
      this.errorContrasena = 'La contraseña es incorrecta';
      this.contrasena.setErrors({'incorrect': true});
      return;
    }

    // Si el inicio de sesión es exitoso
    if (this.usuario.value !== null) {
      sessionStorage.setItem('usuario', JSON.stringify(usuario));
    }

    // Redirige a la ruta /portada
    this.router.navigate(['/portada']);
  }

  loginWithSteam() {
    // Implementar login con Steam
  }

  loginWithGoogle() {
    // Implementar login con Google
  }

  loginWithDiscord() {
    // Implementar login con Discord
  }
}
