import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuarioService } from '../usuario.service';

@Component({
  selector: 'app-menu-usuario',
  templateUrl: './menu-usuario.component.html',
  styleUrl: './menu-usuario.component.css'
})
export class MenuUsuarioComponent implements OnInit {
  usuario$ = this.usuarioService.usuario$;

  constructor(
    private router: Router,
    private usuarioService: UsuarioService
  ) {}

  ngOnInit() {
    this.usuarioService.cargarUsuario();
  }

  cerrarSesion() {
    this.usuarioService.cerrarSesion();
    this.router.navigate(['/']);
  }
} 