import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSlideToggleChange } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';

@Component({
  selector: 'app-preferencias',
  templateUrl: './preferencias.component.html',
  styleUrls: ['./preferencias.component.css']
})
export class PreferenciasComponent {
  mostrarMenu = false;
  activeSection = 'cuenta';
  preferencesForm: FormGroup;
  securityForm: FormGroup;
  perfilForm: FormGroup;
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;
  discordConnected = false;
  steamConnected = false;
  anilistConnected: boolean = false;
  twoFactorEnabled = false;
  showDeleteModal = false;
  showSuccessMessage = false;
  showPreferencesSuccess = false;
  showSecuritySuccess = false;
  usuario: any;

  planInfo = {
    nombre: 'Gratuito',
    precio: '0.00',
    periodo: 'mes',
    caracteristicas: [
      'Likes limitados',
      'Sin superZums',
      'Sin descuentos en la tienda',
      'Sin insignias exclusivas',
      'Sin cosméticos exclusivos'
    ]
  };

  planesCaracteristicas = {
    basic: [
      'Likes ilimitados',
      '5 SuperLikes por semana'
    ],
    pro: [
      'Likes ilimitados',
      '5 SuperLikes por día',
      'Acceso a descuentos exclusivos',
      'Insignia de perfil premium'
    ],
    premium: [
      'Todas las características Pro',
      'Soporte prioritario 24/7',
      'Cosméticos exclusivos'
    ]
  };

  constructor(
    private fb: FormBuilder,
    private router: Router
  ) {
    this.initializeForms();
    this.cargarUsuario();
  }

  private cargarUsuario() {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
      this.perfilForm.patchValue({
        email: this.usuario.email || '',
        username: this.usuario.usuario || ''
      });

      // Cargar información del plan según la suscripción
      if (this.usuario.ficha?.premium) {
        switch(this.usuario.ficha.premium.tipo) {
          case 'basic':
            this.planInfo = {
              nombre: 'Básico',
              precio: '4.99',
              periodo: this.usuario.ficha.premium.periodo || 'mes',
              caracteristicas: this.planesCaracteristicas.basic
            };
            break;
          case 'pro':
            this.planInfo = {
              nombre: 'Pro',
              precio: '19.99',
              periodo: this.usuario.ficha.premium.periodo || 'mes',
              caracteristicas: this.planesCaracteristicas.pro
            };
            break;
          case 'premium':
            this.planInfo = {
              nombre: 'Premium',
              precio: '29.99',
              periodo: this.usuario.ficha.premium.periodo || 'mes',
              caracteristicas: this.planesCaracteristicas.premium
            };
            break;
        }
      }
    }
  }

  private initializeForms() {
    this.perfilForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      username: ['', Validators.required]
    });

    this.preferencesForm = this.fb.group({
      genero: ['todos'],
      edadMin: [18, [Validators.required, Validators.min(18), Validators.max(100)]],
      edadMax: [50, [Validators.required, Validators.min(18), Validators.max(100)]],
      distanciaMaxima: [25, [Validators.required, Validators.min(1), Validators.max(500)]]
    });

    this.securityForm = this.fb.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  private passwordMatchValidator(g: FormGroup) {
    const newPassword = g.get('newPassword')?.value;
    const confirmPassword = g.get('confirmPassword')?.value;
    return newPassword === confirmPassword ? null : { 'mismatch': true };
  }

  setActiveSection(section: string) {
    this.activeSection = section;
  }

  onSliderChange() {
    const edadMin = this.preferencesForm.get('edadMin')?.value;
    const edadMax = this.preferencesForm.get('edadMax')?.value;
    
    if (edadMin > edadMax) {
      this.preferencesForm.patchValue({
        edadMax: edadMin
      });
    }
  }

  toggleTwoFactor(event: MatSlideToggleChange) {
    this.twoFactorEnabled = event.checked;
  }

  guardarCambiosPerfil() {
    if (this.perfilForm.valid) {
      const usuarioActualizado = {
        ...this.usuario,
        email: this.perfilForm.value.email,
        usuario: this.perfilForm.value.username
      };
      sessionStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
      this.showSuccessMessage = true;
      setTimeout(() => this.showSuccessMessage = false, 3000);
    }
  }

  guardarPreferencias() {
    if (this.preferencesForm.valid) {
      const usuarioActualizado = {
        ...this.usuario,
        preferencias: {
          genero: this.preferencesForm.value.genero,
          edadMin: this.preferencesForm.value.edadMin,
          edadMax: this.preferencesForm.value.edadMax,
          distanciaMaxima: this.preferencesForm.value.distanciaMaxima
        }
      };
      sessionStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
      this.showPreferencesSuccess = true;
      setTimeout(() => this.showPreferencesSuccess = false, 3000);
    }
  }

  cambiarContrasena() {
    if (this.securityForm.valid) {
      const currentPassword = this.securityForm.get('currentPassword')?.value;
      const newPassword = this.securityForm.get('newPassword')?.value;
      
      // Verificar que la contraseña actual coincide
      if (currentPassword !== this.usuario.contrasena) {
        this.securityForm.get('currentPassword')?.setErrors({ 'incorrect': true });
        return;
      }

      // Actualizar la contraseña en el usuario
      const usuarioActualizado = {
        ...this.usuario,
        contrasena: newPassword
      };
      
      sessionStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
      this.usuario = usuarioActualizado;
      
      this.showSecuritySuccess = true;
      setTimeout(() => {
        this.showSecuritySuccess = false;
        this.securityForm.reset();
      }, 3000);
    }
  }

  toggleConexion(servicio: string) {
    switch(servicio) {
      case 'discord':
        this.discordConnected = !this.discordConnected;
        break;
      case 'steam':
        this.steamConnected = !this.steamConnected;
        break;
      case 'anilist':
        this.anilistConnected = !this.anilistConnected;
        break;
    }
  }

  openDeleteModal() {
    this.showDeleteModal = true;
  }

  confirmarEliminarCuenta() {
    sessionStorage.removeItem('usuario');
    sessionStorage.removeItem('notificaciones');
    this.router.navigate(['/inicio']);
  }

  cancelarEliminarCuenta() {
    this.showDeleteModal = false;
  }

  cancelarSuscripcion() {
    const usuarioActualizado = {
      ...this.usuario,
      ficha: {
        ...this.usuario.ficha,
        premium: null
      }
    };
    
    sessionStorage.setItem('usuario', JSON.stringify(usuarioActualizado));
    this.usuario = usuarioActualizado;
    
    // Actualizar a plan gratuito
    this.planInfo = {
      nombre: 'Gratuito',
      precio: '0.00',
      periodo: 'mes',
      caracteristicas: [
        'Likes limitados',
        'Sin chat de voz',
        'Sin insignias exclusivas',
        'Sin cosméticos exclusivos'
      ]
    };
  }
}
