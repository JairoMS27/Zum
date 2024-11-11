import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { VistaXeralComponent } from './vista-xeral/vista-xeral.component';
import { MensajesComponent } from './mensajes/mensajes.component';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';
import { PaseBatallaComponent } from './pase-batalla/pase-batalla.component';
import { PremiumComponent } from './premium/premium.component';
import { TiendaComponent } from './tienda/tienda.component';
import { PerfilComponent } from './perfil/perfil.component';
import { PreferenciasComponent } from './preferencias/preferencias.component';
import { SoporteComponent } from './soporte/soporte.component';
import { PoliticasComponent } from './politicas/politicas.component';
import { TerminosComponent } from './terminos/terminos.component';
import { PreguntasFrecuentesComponent } from './preguntas-frecuentes/preguntas-frecuentes.component';
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
    PaseBatallaComponent,
    PremiumComponent,
    TiendaComponent,
    PerfilComponent,
    PreferenciasComponent,
    SoporteComponent,
    PoliticasComponent,
    TerminosComponent,
    PreguntasFrecuentesComponent,
    InicioComponent,
    RegistroComponent,
    ChatsComponent,
    AdminUsuariosComponent,
    AdminMensajesComponent,
    AdminSoporteComponent,
    AdminEtiquetasComponent,
    AdminTemporadasComponent,
    AdminCosmeticosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    NgSelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
