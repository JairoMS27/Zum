import { Component, OnInit } from '@angular/core';
import { EtiquetasService } from '../etiquetas-servizo.service';
import { Etiqueta } from '../etiqueta';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-etiquetas',
  templateUrl: './admin-etiquetas.component.html',
  styleUrls: ['./admin-etiquetas.component.css'],
})
export class AdminEtiquetasComponent implements OnInit {
  etiquetas: Etiqueta[] = []; // Array de etiquetas
  abrirModal = false; // Variable para abrir o cerrar o modal
  etiquetaEditar: Etiqueta | null = null; // Etiqueta que se va a editar
  etiquetasFormulario: FormGroup; // Formulario para crear y editar etiquetas

  // Inyectamos el servicio de etiquetas y el formBuilder
  constructor(
    private etiquetasService: EtiquetasService,
    private formBuilder: FormBuilder
  ) {
    this.etiquetasFormulario = this.formBuilder.group({
      nombre: '',
      categoria: ''
    });
  }

  // Al iniciar el componente obtenemos las etiquetas
  ngOnInit() {
    this.etiquetas = this.etiquetasService.obtenerEtiquetas();
  }

  // Funcion para abrir el modal de crear etiqueta
  crearEtiqueta() {
    const valoresFormularioCrear = this.etiquetasFormulario.value;
    const nuevaEtiqueta: Etiqueta = {
      nombre: valoresFormularioCrear.nombre,
      categoria: valoresFormularioCrear.categoria
    };

    this.etiquetasService.crearEtiqueta(nuevaEtiqueta); // Añadimos la etiqueta
    this.etiquetas = this.etiquetasService.obtenerEtiquetas(); // Actualizamos las etiquetas
    this.etiquetasFormulario.reset(); // Reseteamos el formulario
    this.abrirModal = false;
  }

  // Funcion para abrir el modal de editar etiqueta
  abrirModalEditar(etiqueta: Etiqueta) {
    this.etiquetaEditar = { ...etiqueta }; // Copiamos la etiqueta
    this.etiquetasFormulario.setValue({
      nombre: etiqueta.nombre,
      categoria: etiqueta.categoria
    });
    this.abrirModal = true;
  }

  // Funcion para editar la etiqueta
  editarEtiqueta() {
    if (this.etiquetaEditar) {
      const valoresFormularioEditar = this.etiquetasFormulario.value;
      const etiquetaActualizada: Etiqueta = {
        nombre: valoresFormularioEditar.nombre,
        categoria: valoresFormularioEditar.categoria
      };
      this.etiquetasService.actualizarEtiqueta(
        // Actualizamos la etiqueta
        this.etiquetaEditar.nombre,
        etiquetaActualizada
      );
      this.etiquetas = this.etiquetasService.obtenerEtiquetas(); // Actualizamos las etiquetas
      this.etiquetaEditar = null;
      this.abrirModal = false;
    }
  }

  // Funcion para eliminar una etiqueta
  eliminarEtiqueta(etiqueta: Etiqueta) {
    this.etiquetasService.eliminarEtiqueta(etiqueta.nombre); // Eliminamos la etiqueta
    this.etiquetas = this.etiquetasService.obtenerEtiquetas(); // Actualizamos las etiquetas
  }

  // Funcion para cerrar el modal
  cerrarModal() {
    this.abrirModal = false;
    this.etiquetaEditar = null;
  }
}
