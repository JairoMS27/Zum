// help.component.ts
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

interface FaqCategory {
  name: string;
  icon: string;
  faqs: Faq[];
}

interface Faq {
  question: string;
  answer: string;
}

@Component({
  selector: 'app-ayuda',
  templateUrl: './ayuda.component.html',
  styleUrls: ['./ayuda.component.css'],
})
export class AyudaComponent {
  usuario: any = null;
  languages = [
    { code: 'es', name: 'Español' },
    { code: 'en', name: 'English' },
    { code: 'fr', name: 'Français' },
  ];
  searchControl = new FormControl('');
  expandedIndex = -1;

  faqCategories: FaqCategory[] = [
    {
      name: 'Cuenta y Perfil',
      icon: 'person',
      faqs: [
        {
          question: '¿Cómo creo una cuenta?',
          answer:
            'Para crear una cuenta, haz clic en "Registrarse" en la página principal. Completa el formulario con tu información básica, como nombre, correo electrónico y contraseña.',
        },
        {
          question: '¿Puedo editar mi perfil después de crearlo?',
          answer:
            'Sí, puedes editar tu perfil en cualquier momento. Ve a la sección "Perfil". Aquí podrás actualizar tu información personal, fotos y preferencias.',
        },
      ],
    },
    {
      name: 'Tienda',
      icon: 'shopping_cart',
      faqs: [
        {
          question: '¿Qué tipo de productos están disponibles en la tienda?',
          answer:
            'En nuestra tienda, ofrecemos una variedad de productos, incluyendo decoraciones para tu perfil, likes y varios tipos de packs.',
        },
        {
          question: '¿Cómo puedo realizar una compra en la tienda?',
          answer:
            'Para realizar una compra, inicia sesión en tu cuenta y dirígete a la sección "Tienda". Selecciona el producto que deseas y sigue las instrucciones para completar el pago.',
        },
        {
          question: '¿Puedo obtener un reembolso por una compra?',
          answer: 'No aceptamos reembolsos por compras realizadas en la tienda. Asegúrate de revisar bien los productos antes de completar tu compra.'
        }
      ],
    },
    {
      name: 'Suscripciones',
      icon: 'card_membership',
      faqs: [
        {
          question: '¿Cuáles son los beneficios de una suscripción premium?',
          answer:
            'Con una suscripción premium, obtienes acceso a funciones exclusivas, como descuentos exlusivos y soporte prioritario.',
        },
        {
          question: '¿Cómo puedo cancelar mi suscripción?',
          answer:
            'Puedes cancelar tu suscripción en la sección "Mi Cuenta". Selecciona "Suscripciones" y sigue las instrucciones para cancelar. Tu acceso a las funciones premium continuará hasta el final del período de facturación.',
        },
        {
          question: '¿Se renovará automáticamente mi suscripción?',
          answer:
            'Sí, las suscripciones se renuevan automáticamente al final de cada período de facturación, a menos que las canceles antes de la fecha de renovación.',
        },
      ],
    },
    {
      name: 'Privacidad y Seguridad',
      icon: 'security',
      faqs: [
        {
          question: '¿Cómo protege la plataforma mi información personal?',
          answer:
            'Utilizamos medidas de seguridad avanzadas, como cifrado de datos y autenticación de dos factores, para proteger tu información personal y mantenerla segura.',
        },
        {
          question: '¿Qué debo hacer si encuentro un perfil sospechoso?',
          answer:
            'Si encuentras un perfil que te parece sospechoso o que infringe nuestras políticas, repórtalo inmediatamente a nuestro equipo de soporte a través de la opción "Reportar" en el perfil del usuario.',
        },
      ],
    },
  ];

  contactMethods = [
    { icon: 'mail', text: 'soporte@zuum.com' },
  ];

  constructor() {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
    }
  }
}
