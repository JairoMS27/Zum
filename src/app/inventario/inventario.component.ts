import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Skin {
  id: number;
  nombre: string;
  imagen: string;
  equipada: boolean;
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.css'
})
export class InventarioComponent implements OnInit {
  mostrarMenu = false;
  usuario: any = null;
  skins: Skin[] = [];
  
  // Catálogo de todas las skins disponibles
  private todasLasSkins: { [key: number]: Skin } = {
    1: {
      id: 1,
      nombre: 'Skin Dorada',
      imagen: 'assets/skins/golden.png',
      equipada: false
    },
    2: {
      id: 2,
      nombre: 'Skin Diamante',
      imagen: 'assets/skins/diamond.png',
      equipada: false
    },
    3: {
      id: 3,
      nombre: 'Skin Legendaria',
      imagen: 'assets/skins/legendary.png',
      equipada: false
    }
  };
  
  constructor(private snackBar: MatSnackBar) {}

  ngOnInit() {
    const usuarioGuardado = sessionStorage.getItem('usuario');
    if (usuarioGuardado) {
      this.usuario = JSON.parse(usuarioGuardado);
      if (!this.usuario.inventario) {
        this.usuario.inventario = [];
      }
      if (!this.usuario.skinEquipada) {
        this.usuario.skinEquipada = null;
      }
      this.actualizarSkins();
    }
  }

  private actualizarSkins() {
    this.skins = this.usuario.inventario.map((id: number) => ({
      ...this.todasLasSkins[id],
      equipada: this.usuario.skinEquipada === id
    }));
  }

  equiparSkin(skin: Skin) {
    // Desequipar todas las skins
    this.skins.forEach(s => s.equipada = false);
    // Equipar la skin seleccionada
    skin.equipada = true;
    
    // Actualizar en el sessionStorage
    this.usuario.skinEquipada = skin.id;
    sessionStorage.setItem('usuario', JSON.stringify(this.usuario));

    this.snackBar.open(`¡${skin.nombre} equipada con éxito!`, 'Cerrar', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'bottom'
    });
  }
}
