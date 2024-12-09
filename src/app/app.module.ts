import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatDividerModule } from '@angular/material/divider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion'; 
import { MatSelectModule } from '@angular/material/select';
import { MatSliderModule } from '@angular/material/slider';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatRadioModule } from '@angular/material/radio';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { VistaXeralComponent } from './vista-xeral/vista-xeral.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { PremiumComponent } from './premium/premium.component';
import { TiendaComponent } from './tienda/tienda.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PreferenciasComponent } from './preferencias/preferencias.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { TerminosComponent } from './terminos/terminos.component';
import { InicioComponent } from './inicio/inicio.component';
import { RegistroComponent } from './registro/registro.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChatsComponent } from './chats/chats.component';
import { AdminUsuariosComponent } from './admin-usuarios/admin-usuarios.component';
import { AdminMensajesComponent } from './admin-mensajes/admin-mensajes.component';
import { AdminSoporteComponent } from './admin-soporte/admin-soporte.component';
import { AdminEtiquetasComponent } from './admin-etiquetas/admin-etiquetas.component';
import { AdminTemporadasComponent } from './admin-temporadas/admin-temporadas.component';
import { AdminCosmeticosComponent } from './admin-cosmeticos/admin-cosmeticos.component';
import { AyudaComponent } from './ayuda/ayuda.component';

import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { InventarioComponent } from './inventario/inventario.component';
import { MenuUsuarioComponent } from './menu-usuario/menu-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    CardComponent,
    FooterComponent,
    VistaXeralComponent,
    VistaXeralComponent,
    MensajesComponent,
    AdminComponent,
    LoginComponent,
    PremiumComponent,
    TiendaComponent,
    PerfilComponent,
    PreferenciasComponent,
    PoliticasComponent,
    TerminosComponent,
    InicioComponent,
    RegistroComponent,
    ChatsComponent,
    AdminUsuariosComponent,
    AdminMensajesComponent,
    AdminSoporteComponent,
    AdminEtiquetasComponent,
    AdminTemporadasComponent,
    AdminCosmeticosComponent,
    AyudaComponent,
    InventarioComponent,
    MenuUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatDividerModule,
    MatBadgeModule,
    MatListModule,
    MatSidenavModule,
    MatGridListModule,
    MatCardModule,
    MatChipsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSelectModule,
    MatSliderModule,
    MatSlideToggleModule,
    MatTableModule,
    MatCheckboxModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatSnackBarModule,
    MatRadioModule,
  ],
  providers: [
    provideAnimationsAsync(),
    { provide: MAT_DATE_LOCALE, useValue: 'es-ES' }, //  establece la localización
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
