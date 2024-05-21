import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/Comercial-folder/inicio/inicio.component';
import { VenderComponent } from './components/Comercial-folder/vender/vender.component';
import { ContactoComponent } from './components/Comercial-folder/contacto/contacto.component';
import { AcercaDeComponent } from './components/Comercial-folder/acerca-de/acerca-de.component';
import { UsuariosComponent } from './components/Admin-folder/usuarios/usuarios.component';
import { Usuarios2Component } from './components/Admin-folder/usuarios2/usuarios2.component';

import {HttpClientModule} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { LoginComponent } from './components/Admin-folder/login/login.component';
import { ComercialComponent } from './components/Comercial-folder/comercial/comercial.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './components/Admin-folder/admin/admin.component';
import { InmueblesComponent } from './components/Admin-folder/inmuebles/inmuebles.component';
import { NuevoInmuebleComponent } from './components/Admin-folder/nuevo-inmueble/nuevo-inmueble.component';
import { ModalComponent } from './modal/modalExito/modal.component';
import { DisponibleAlquilerComponent } from './components/Admin-folder/disponible-alquiler/disponible-alquiler.component';
import { DisponibleVentaComponent } from './components/Admin-folder/disponible-venta/disponible-venta.component';
import { DetalleInmuebleComponent } from './components/Admin-folder/detalle-inmueble/detalle-inmueble.component';
import { ModalEditarComponent } from './modal/modal-editar/modal-editar.component';
import { ModalAvisoComponent } from './modal/modal-aviso/modal-aviso.component';
import { ModalYaConfirmadoComponent } from './modal/modal-ya-confirmado/modal-ya-confirmado.component';
import { ListadoPropComponent } from './components/Admin-folder/PROPIETARIOS/listado-prop/listado-prop.component';
import { NuevoPropietarioComponent } from './components/Admin-folder/PROPIETARIOS/nuevo-propietario/nuevo-propietario.component';
import { CargaImagenesComponent } from './components/Admin-folder/carga-imagenes/carga-imagenes.component';


@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    VenderComponent,
    ContactoComponent,
    AcercaDeComponent,
    UsuariosComponent,
    Usuarios2Component,
    LoginComponent,
    ComercialComponent,   
    AdminComponent, 
    InmueblesComponent,
     NuevoInmuebleComponent,
     ModalComponent,
     DisponibleAlquilerComponent,
     DisponibleVentaComponent,
     DetalleInmuebleComponent,
     ModalEditarComponent,
     ModalAvisoComponent,
     ModalYaConfirmadoComponent,
     ListadoPropComponent,
     NuevoPropietarioComponent,
     CargaImagenesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    NgbModule,
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
