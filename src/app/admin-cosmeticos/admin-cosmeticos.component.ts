import { Component, OnInit } from '@angular/core';
import { CosmeticosService } from '../cosmeticos-servizo.service';
import { Cosmetico } from '../cosmetico';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-cosmeticos',
  templateUrl: './admin-cosmeticos.component.html',
  styleUrls: ['./admin-cosmeticos.component.css'],
})
export class AdminCosmeticosComponent implements OnInit {
  cosmeticos: Cosmetico[] = []; // Array de cosmeticos
  abrirModal = false; // Variable para abrir o cerrar o modal
  cosmeticoEditar: Cosmetico | null = null; // Cosmetico que se va a editar
  cosmeticosFormulario: FormGroup; // Formulario para crear y editar cosmeticos

  // Inyectamos el servicio de cosmeticos y el formBuilder
  constructor(
    private cosmeticosService: CosmeticosService,
    private formBuilder: FormBuilder
  ) {
    this.cosmeticosFormulario = this.formBuilder.group({
      nombre: '',
      descripcion: '',
      imagen: '',
      precio: '',
      tipo: '',
    });
  }

  // Al iniciar el componente obtenemos los cosmeticos
  ngOnInit() {
    this.cosmeticos = this.cosmeticosService.obtenerCosmeticos();
  }

  // Funcion para convertir un string a numero
  convertirANumero(valor: string): number {
    return Number(valor);
  }

  // Funcion para abrir el modal de crear cosmetico
  crearCosmetico() {
    const valoresFormularioCrear = this.cosmeticosFormulario.value;
    const nuevoCosmetico: Cosmetico = {
      // Creamos el cosmetico
      nombre: valoresFormularioCrear.nombre,
      descripcion: valoresFormularioCrear.descripcion,
      imagen: valoresFormularioCrear.imagen,
      precio: Number(valoresFormularioCrear.precio),
      tipo: valoresFormularioCrear.tipo,
    };

    this.cosmeticosService.crearCosmetico(nuevoCosmetico);
    this.cosmeticos = this.cosmeticosService.obtenerCosmeticos();
    this.cosmeticosFormulario.reset();
    this.abrirModal = false;
  }

  // Funcion para abrir el modal de editar cosmetico
  abrirModalEditar(cosmetico: Cosmetico) {
    this.cosmeticoEditar = { ...cosmetico }; // Clonamos el cosmetico para no modificar el original
    this.cosmeticosFormulario.setValue({
      // Seteamos los valores del formulario con los del cosmetico
      nombre: cosmetico.nombre,
      descripcion: cosmetico.descripcion,
      imagen: cosmetico.imagen,
      precio: cosmetico.precio,
      tipo: cosmetico.tipo,
    });
    this.abrirModal = true;
  }

  // Funcion para editar un cosmetico
  editarCosmetico() {
    if (this.cosmeticoEditar) {
      const valoresFormularioEditar = this.cosmeticosFormulario.value;
      const cosmeticoActualizado: Cosmetico = {
        // Creamos el cosmetico actualizado
        nombre: valoresFormularioEditar.nombre,
        descripcion: valoresFormularioEditar.descripcion,
        imagen: valoresFormularioEditar.imagen,
        precio: Number(valoresFormularioEditar.precio),
        tipo: valoresFormularioEditar.tipo,
      };
      this.cosmeticosService.actualizarCosmetico(
        // Actualizamos el cosmetico
        this.cosmeticoEditar.nombre,
        cosmeticoActualizado
      );
      this.cosmeticos = this.cosmeticosService.obtenerCosmeticos(); // Obtenemos los cosmeticos
      this.cosmeticoEditar = null;
      this.abrirModal = false;
    }
  }

  // Funcion para eliminar un cosmetico
  eliminarCosmetico(cosmetico: Cosmetico) {
    this.cosmeticosService.eliminarCosmetico(cosmetico.nombre);
    this.cosmeticos = this.cosmeticosService.obtenerCosmeticos();
  }

  // Funcion para cerrar el modal
  cerrarModal() {
    this.abrirModal = false;
    this.cosmeticoEditar = null;
  }
}
