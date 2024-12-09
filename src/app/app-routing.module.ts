import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { VistaXeralComponent } from './vista-xeral/vista-xeral.component';
import { LoginComponent } from './login/login.component';
import { InicioComponent } from './inicio/inicio.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { TerminosComponent } from './terminos/terminos.component';
import { PreferenciasComponent } from './preferencias/preferencias.component';
import { PremiumComponent } from './premium/premium.component';
import { TiendaComponent } from './tienda/tienda.component';
import { UsuarioGuard } from './guards/usuario.guard';
import { AdminGuard } from './guards/admin.guard';
import { RegistroComponent } from './registro/registro.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { ChatsComponent } from './chats/chats.component';
import { AdminMensajesComponent } from './admin-mensajes/admin-mensajes.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminCosmeticosComponent } from './admin-cosmeticos/admin-cosmeticos.component';
import { AdminSoporteComponent } from './admin-soporte/admin-soporte.component';
import { AdminTemporadasComponent } from './admin-temporadas/admin-temporadas.component';
import { AdminEtiquetasComponent } from './admin-etiquetas/admin-etiquetas.component';
import { AyudaComponent } from './ayuda/ayuda.component';
import { InventarioComponent } from './inventario/inventario.component';

const routes: Routes = [
  { path: 'inicio', title: 'Zuum', component: InicioComponent },
  { path: 'registro', title: 'Registro | Zuum', component: RegistroComponent },
  { path: 'login', title: 'Login | Zuum', component: LoginComponent },
  {
    path: 'mensajes/chats/:usuario/:mensaje',
    title: 'Chats | Zuum',
    component: ChatsComponent,
    canActivate: [UsuarioGuard],
  },
  {
    path: 'mensajes/chats/:usuario',
    title: 'Chats | Zuum',
    component: ChatsComponent,
    canActivate: [UsuarioGuard],
  },
  {
    path: 'portada',
    title: 'Inicio | Zuum',
    component: VistaXeralComponent,
    canActivate: [UsuarioGuard],
  },
  {
    path: 'administracion',
    title: 'Inicio | Administracion',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: 'mensajes',
        title: 'Mensajes | Administracion',
        component: AdminMensajesComponent,
      },
      {
        path: 'usuarios',
        title: 'Usuarios | Administracion',
        component: AdminUsuariosComponent,
      },
      {
        path: 'cosmeticos',
        title: 'Cosmeticos | Administracion',
        component: AdminCosmeticosComponent,
      },
      {
        path: 'etiquetas',
        title: 'Etiquetas | Administracion',
        component: AdminEtiquetasComponent,
      },
      {
        path: 'soporte',
        title: 'Soporte | Administracion',
        component: AdminSoporteComponent,
      },
      {
        path: 'temporadas',
        title: 'Temporadas | Administracion',
        component: AdminTemporadasComponent,
      },
    ],
  },
  {
    path: 'premium',
    title: 'Premium | Zuum',
    component: PremiumComponent,
    canActivate: [UsuarioGuard],
  },
  {
    path: 'tienda',
    title: 'Tienda | Zuum',
    component: TiendaComponent,
    canActivate: [UsuarioGuard],
  },
  {
    path: 'perfil/:nombre',
    title: 'Perfil | Zuum',
    component: PerfilComponent,
    canActivate: [UsuarioGuard],
  },
  {
    path: 'inventario',
    title: 'Inventario | Zuum',
    component: InventarioComponent,
    canActivate: [UsuarioGuard],
  },
  {
    path: 'preferencias',
    title: 'Preferencias | Zuum',
    component: PreferenciasComponent,
    canActivate: [UsuarioGuard],
  },
  {
    path: 'politicas',
    title: 'Politicas de privacidad | Zuum',
    component: PoliticasComponent,
  },
  { path: 'ayuda', title: 'Ayuda', component: AyudaComponent },
  {
    path: 'terminos',
    title: 'Terminos y Condiciones',
    component: TerminosComponent,
  },
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
