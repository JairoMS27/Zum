import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ServizoLoginService } from '../servizo-login.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {
  rexistroForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private servizoLoginService: ServizoLoginService
  ) {
    this.rexistroForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.minLength(3)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      contrasenaRepetida: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required, this.validadorEdad()]],
      genero: ['', [Validators.required]],
      orientacion: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    // Validar usuario existente
    this.rexistroForm.get('usuario')?.valueChanges.subscribe(value => {
      if (value && this.usuarioExiste(value)) {
        this.rexistroForm.get('usuario')?.setErrors({ 'usuarioExistente': true });
      }
    });

    // Validar contraseñas coincidentes
    this.rexistroForm.get('contrasenaRepetida')?.valueChanges.subscribe(() => {
      this.validarContrasenas();
    });

    this.rexistroForm.get('contrasena')?.valueChanges.subscribe(() => {
      this.validarContrasenas();
    });
  }

  // Validador de edad
  validadorEdad() {
    return (control: AbstractControl): {[key: string]: any} | null => {
      if (control.value) {
        const fecha = new Date(control.value);
        const hoy = new Date();
        let edad = hoy.getFullYear() - fecha.getFullYear();
        const mes = hoy.getMonth() - fecha.getMonth();
        
        if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
          edad--;
        }
        
        if (edad < 18) {
          return { 'menorDeEdad': true };
        }
      }
      return null;
    };
  }

  // Validar contraseñas
  validarContrasenas() {
    const contrasena = this.rexistroForm.get('contrasena')?.value;
    const contrasenaRepetida = this.rexistroForm.get('contrasenaRepetida')?.value;

    if (contrasena && contrasenaRepetida && contrasena !== contrasenaRepetida) {
      this.rexistroForm.get('contrasenaRepetida')?.setErrors({ 'noCoinciden': true });
    } else if (contrasenaRepetida) {
      this.rexistroForm.get('contrasenaRepetida')?.setErrors(null);
    }
  }

  // Verificar si el usuario ya existe
  usuarioExiste(usuario: string): boolean {
    return this.servizoLoginService.usuarios.some(u => u.usuario === usuario);
  }

  // Métodos para obtener mensajes de error
  getErrorUsuario(): string {
    const control = this.rexistroForm.get('usuario');
    if (control?.hasError('required')) {
      return 'El nombre de usuario es obligatorio';
    }
    if (control?.hasError('minlength')) {
      return 'El nombre de usuario debe tener al menos 3 caracteres';
    }
    if (control?.hasError('usuarioExistente')) {
      return 'Este nombre de usuario ya está en uso';
    }
    return '';
  }

  getErrorCorreo(): string {
    const control = this.rexistroForm.get('correo');
    if (control?.hasError('required')) {
      return 'El correo electrónico es obligatorio';
    }
    if (control?.hasError('email')) {
      return 'Por favor, introduce un correo electrónico válido';
    }
    return '';
  }

  getErrorContrasena(): string {
    const control = this.rexistroForm.get('contrasena');
    if (control?.hasError('required')) {
      return 'La contraseña es obligatoria';
    }
    if (control?.hasError('minlength')) {
      return 'La contraseña debe tener al menos 6 caracteres';
    }
    return '';
  }

  getErrorContrasenaRepetida(): string {
    const control = this.rexistroForm.get('contrasenaRepetida');
    if (control?.hasError('required')) {
      return 'Debes confirmar la contraseña';
    }
    if (control?.hasError('noCoinciden')) {
      return 'Las contraseñas no coinciden';
    }
    return '';
  }

  getErrorFecha(): string {
    const control = this.rexistroForm.get('fechaNacimiento');
    if (control?.hasError('required')) {
      return 'La fecha de nacimiento es obligatoria';
    }
    if (control?.hasError('menorDeEdad')) {
      return 'Debes ser mayor de 18 años para registrarte';
    }
    return '';
  }

  getErrorGenero(): string {
    const control = this.rexistroForm.get('genero');
    if (control?.hasError('required')) {
      return 'Por favor, selecciona tu género';
    }
    return '';
  }

  getErrorOrientacion(): string {
    const control = this.rexistroForm.get('orientacion');
    if (control?.hasError('required')) {
      return 'Por favor, selecciona tu orientación sexual';
    }
    return '';
  }

  completarRegistro() {
    if (this.rexistroForm.valid) {
      // Crear el objeto de usuario
      const nuevoUsuario = {
        usuario: this.rexistroForm.get('usuario')?.value,
        correo: this.rexistroForm.get('correo')?.value,
        contrasena: this.rexistroForm.get('contrasena')?.value,
        fechaNacimiento: this.rexistroForm.get('fechaNacimiento')?.value,
        matches: [],
        likes: 0,
        superZuums: 0,
        premium: false,
        rol: 'normal',
        ficha: {
          fotoPerfil: '',
          nombre: '',
          apelidos: '',
          genero: this.rexistroForm.get('genero')?.value,
          orientacion: this.rexistroForm.get('orientacion')?.value,
          ciudad: '',
          descripcion: '',
          etiquetas: [],
          juegosFavoritos: [],
          animesFavoritos: [],
          discord: '',
          steam: '',
          xbox: '',
          playstation: '',
          aniList: '',
          premium: {
            activo: false,
            tipo: '',
            mostrarIcono: true,
            colorNombre: '#000000'
          }
        }
      };

      // Guardar el usuario en el servicio
      this.servizoLoginService.usuarios.push(nuevoUsuario);

      // Guardar el usuario en sessionStorage
      sessionStorage.setItem('usuario', JSON.stringify(nuevoUsuario));

      console.log('Usuario registrado:', nuevoUsuario);
      
      // Redirigir a la página de inicio
      this.router.navigate(['/portada']);
    } else {
      // Marcar todos los campos como tocados para mostrar los errores
      Object.keys(this.rexistroForm.controls).forEach(key => {
        const control = this.rexistroForm.get(key);
        control?.markAsTouched();
      });
    }
  }
}
