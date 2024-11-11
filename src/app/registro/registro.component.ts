import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { XogosService } from '../xogos.service';
import { Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Etiqueta } from '../etiqueta';
import { EtiquetasService } from '../etiquetas-servizo.service';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class RegistroComponent implements OnInit {
  pasoActual = 1;
  opciones: any[] = [];
  terminosBusqueda$ = new Subject<string>(); // observable para buscar opciones
  opcionesBusqueda$: Observable<any[]>; // observable para buscar opciones
  usuario = {
    // Objeto para guardar el usuario
    correo: '',
    contrasena: '',
    nombre: '',
    apelidos: '',
    fechaNacimiento: '',
    matches: [],
    rol: 'normal',
    usuario: '',
    foto: '',
    descripcion: '',
    sobreMi: '',
    juegosFavoritos: [],
    etiquetas: [],
    genero: '',
    ubicacion: '',
    orientacion: '',
    busqueda: '',
    discord: '',
    xbox: '',
    playstation: '',
    steam: '',
    premium: false,
    superzuums: 0,
  };
  etiquetas: Etiqueta[] = []; // Array de etiquetas
  rexistroForm: FormGroup; // Formulario de registro

  constructor(
    private fb: FormBuilder,
    private XogosService: XogosService,
    private etiquetasService: EtiquetasService
  ) {
    this.rexistroForm = this.fb.group({
      // Inicializar el formulario de registro
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      contrasenaRepetida: ['', [Validators.required, Validators.minLength(8)]],
      nombre: ['', [Validators.required]],
      apelidos: ['', [Validators.required]],
      fechaNacimiento: ['', [Validators.required, this.esMayorDeEdad]],
      usuario: ['', [Validators.required]],
      foto: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
      descripcion: ['', [Validators.required]],
      sobreMi: ['', [Validators.required]],
      juegosFavoritos: ['', [Validators.required]],
      etiquetas: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      orientacion: ['', [Validators.required]],
      busqueda: ['', [Validators.required]],
      discord: ['', [Validators.required]],
      xbox: [''],
      playstation: [''],
    });

    this.rexistroForm.setValidators(this.verificarContrasenas); // Establecer validadores para las contrasenas
  }

  // Metodo para verificar que las contrasenas sean iguales
  verificarContrasenas(
    control: AbstractControl // Control de formulario
  ): { [key: string]: boolean } | null {
    // Devuelve un objeto o null
    const grupo = control as FormGroup; // Convertir el control a un FormGroup
    let controlContrasena = grupo.get('contrasena');
    let controlContrasenaRepetida = grupo.get('contrasenaRepetida');

    if (controlContrasena && controlContrasenaRepetida) {
      // Si los controles existen
      let contrasena = controlContrasena.value; // Obtener el valor de la contrasena
      let contrasenaRepetida = controlContrasenaRepetida.value; // Obtener el valor de la contrasena repetida

      return contrasena === contrasenaRepetida ? null : { noIguales: true }; // Devolver null si las contrasenas son iguales, sino devolver un objeto
    }

    return { noIguales: true }; // Devolver un objeto si no se cumple la condicion
  }

  // Metodo para verificar que el usuario sea mayor de edad
  esMayorDeEdad(control: AbstractControl): { [key: string]: boolean } | null {
    // Devuelve un objeto o null
    if (control.value) {
      // Si el control tiene un valor
      const fechaNacimiento = new Date(control.value); // Convertir el valor a una fecha
      const fechaActual = new Date(); // Obtener la fecha actual
      const diferenciaEnMilisegundos = Math.abs(
        // Calcular la diferencia en milisegundos
        fechaActual.getTime() - fechaNacimiento.getTime() // Restar la fecha actual a la fecha de nacimiento
      );
      const diferenciaEnAnos =
        diferenciaEnMilisegundos / (1000 * 3600 * 24) / 365; // Calcular la diferencia en años

      if (diferenciaEnAnos < 18) {
        // Si la diferencia es menor a 18
        return { menorDeEdad: true }; // Devolver un objeto si el usuario es menor de edad
      }
    }

    return null; // Devolver null si el usuario es mayor de edad
  }

  ngOnInit(): void {
    // Al iniciar el componente
    this.XogosService.obtenerOpciones().subscribe((data) => {
      // Obtener las opciones
      this.opciones = data;
    });

    // Buscar opciones  al escribir
    this.opcionesBusqueda$ = this.terminosBusqueda$.pipe(
      // Pipe para buscar opciones
      debounceTime(200), // espera 200ms despues de cada pulsacion
      distinctUntilChanged(), // ignora si el siguiente termino de busqueda es igual al anterior
      switchMap((term: string) => this.XogosService.buscarOpciones(term)) // cambia a un nuevo observable cada vez que el termino cambia
    );

    const usuarioGuardado = sessionStorage.getItem('usuario'); // Recuperar el objeto del usuario de sessionStorage
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado); // Convertir el objeto a JSON
    }

    this.etiquetas = this.etiquetasService.obtenerEtiquetas(); // Obtener las etiquetas
  }

  // Metodo para avanzar al siguiente paso del registro
  guardarUsuario() {
    sessionStorage.setItem('usuario', JSON.stringify(this.rexistroForm.value)); // Guardar el usuario en sessionStorage
  }

  // Metodo para guardar el registro
  completarRegistro() {
    sessionStorage.setItem('usuario', JSON.stringify(this.rexistroForm.value)); // Guardar el usuario en sessionStorage
  }
}
