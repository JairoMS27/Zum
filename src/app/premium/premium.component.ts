import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NotificacionesService } from '../notificaciones-servizo.service';
import { MatSnackBar } from '@angular/material/snack-bar';

type PlanType = 'basic' | 'pro' | 'premium';

@Component({
  selector: 'app-premium',
  templateUrl: './premium.component.html',
  styleUrls: ['./premium.component.css'],
})
export class PremiumComponent {
  mostrarMenu = false;
  modalAbierto = false;
  esPremium: boolean = false;
  selectedPlan: PlanType = 'basic';
  selectedPrice: number = 0;
  selectedPeriod: 'monthly' | 'annual' = 'monthly';
  planActual: PlanType | null = null;

  constructor(
    private servicioNotificaciones: NotificacionesService,
    private snackBar: MatSnackBar
  ) {
    this.cargarEstadoPremium();
  }

  private cargarEstadoPremium() {
    const usuarioJSON = sessionStorage.getItem('usuario');
    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      this.esPremium = usuario.ficha?.premium?.activo || false;
      this.planActual = usuario.ficha?.premium?.tipo || null;
    }
  }

  plans = [
    {
      type: 'basic',
      name: 'Básico',
      monthlyPrice: 3.99,
      annualPrice: 43.09,
      features: [
        'Likes ilimitados',
        '5 SuperLikes por semana',
        'Funciones básicas'
      ]
    },
    {
      type: 'pro',
      name: 'Pro',
      monthlyPrice: 19.99,
      annualPrice: 215.89,
      features: [
        'Likes ilimitados',
        '5 SuperLikes por día',
        '5% de descuento en la tienda',
        'Insignia de perfil pro'
      ]
    },
    {
      type: 'premium',
      name: 'Premium',
      monthlyPrice: 29.99,
      annualPrice: 323.89,
      features: [
        'Likes ilimitados',
        'SuperLikes ilimitados',
        '15% de descuento en la tienda',
        'Insignia de perfil premium',
        'Soporte prioritario 24/7',
        'Cosméticos exclusivos'
      ]
    }
  ];

  abrirModal(planType: PlanType) {
    if (this.esPremium && planType === this.planActual) {
      this.snackBar.open('Ya estás suscrito a este plan', 'OK', {
        duration: 3000
      });
      return;
    }

    this.selectedPlan = planType;
    this.selectedPrice = this.getPlanPrice(planType);
    this.modalAbierto = true;
  }

  cerrarModal() {
    this.modalAbierto = false;
  }

  public getPlanPrice(planType: string): number {
    const plan = this.plans.find(p => p.type === planType);
    if (plan) {
      return this.selectedPeriod === 'monthly' ? 
        plan.monthlyPrice : 
        plan.annualPrice;
    }
    return 0;
  }

  getSelectedPlanName(): string {
    const plan = this.plans.find(p => p.type === this.selectedPlan);
    return plan ? plan.name : '';
  }

  getSelectedPlanFeatures(): string[] {
    const plan = this.plans.find(p => p.type === this.selectedPlan);
    return plan?.features || [];
  }

  getTipoPremium(): string {
    return this.planActual || '';
  }

  isPlanInferior(planType: PlanType): boolean {
    const planOrder: Record<PlanType, number> = {
      'basic': 1,
      'pro': 2,
      'premium': 3
    };
    return planOrder[planType] < planOrder[this.planActual || 'basic'];
  }

  updatePrices() {
    this.selectedPrice = this.getPlanPrice(this.selectedPlan);
  }

  getButtonText(planType: PlanType): string {
    if (this.esPremium) {
      if (planType === this.planActual) {
        return 'Plan actual';
      }
      return 'Cambiar plan';
    }
    return 'Suscribirse';
  }

  isButtonDisabled(planType: PlanType): boolean {
    return this.esPremium && planType === this.planActual;
  }

  pagar() {
    const usuarioJSON = sessionStorage.getItem('usuario');
    if (usuarioJSON) {
      const usuario = JSON.parse(usuarioJSON);
      if (!usuario.ficha) {
        usuario.ficha = {
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
            tipo: '',
            mostrarIcono: true,
            colorNombre: '#000000'
          }
        };
      }

      usuario.ficha.premium = {
        activo: true,
        tipo: this.selectedPlan,
        mostrarIcono: true,
        colorNombre: this.selectedPlan === 'premium' ? '#FFD700' : 
                    this.selectedPlan === 'pro' ? '#C0C0C0' : '#000000'
      };
      
      // Actualizar superZuums según el plan
      if (this.selectedPlan === 'basic') {
        usuario.superZuums = 5;
      } else if (this.selectedPlan === 'pro') {
        usuario.superZuums = 35; // 5 por día
      } else if (this.selectedPlan === 'premium') {
        usuario.superZuums = 999999;
      }
      
      sessionStorage.setItem('usuario', JSON.stringify(usuario));

      // Enviar notificación de suscripción
      const mensaje = this.esPremium ? 
        `Has cambiado tu plan a ${this.getSelectedPlanName()}` :
        `Te has suscrito al plan ${this.getSelectedPlanName()}`;
      
      this.servicioNotificaciones.notificarSuscripcionPremium(mensaje);

      this.snackBar.open(mensaje, 'OK', {
        duration: 3000,
        panelClass: ['success-snackbar']
      });
    }

    this.modalAbierto = false;
    this.esPremium = true;
    this.planActual = this.selectedPlan;
  }
}
