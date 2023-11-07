import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//componentes
import { InicioComponent } from './components/Comercial-folder/inicio/inicio.component';
import { VenderComponent } from './components/Comercial-folder/vender/vender.component';
import { ContactoComponent } from './components/Comercial-folder/contacto/contacto.component';
import { AcercaDeComponent } from './components/Comercial-folder/acerca-de/acerca-de.component';
import { UsuariosComponent } from './components/Admin-folder/usuarios/usuarios.component';
import { Usuarios2Component } from './components/Admin-folder/usuarios2/usuarios2.component';
import { LoginComponent } from './components/Admin-folder/login/login.component';
import { ComercialComponent } from './components/Comercial-folder/comercial/comercial.component';
import { AdminComponent } from './components/Admin-folder/admin/admin.component';
import { InmueblesComponent } from './components/Admin-folder/inmuebles/inmuebles.component';
import { NuevoInmuebleComponent } from './components/Admin-folder/nuevo-inmueble/nuevo-inmueble.component';
import { DisponibleAlquilerComponent } from './components/Admin-folder/disponible-alquiler/disponible-alquiler.component';
import { DisponibleVentaComponent } from './components/Admin-folder/disponible-venta/disponible-venta.component';

const routes: Routes = [

  {
    path: 'Comercial', component: ComercialComponent,
    children: [
      { path: 'Inicio', component: InicioComponent },
      { path: 'Vender', component: VenderComponent },
      { path: 'Contacto', component: ContactoComponent },
      { path: 'AcercaDe', component: AcercaDeComponent },
      { path: 'Usuarios', component: Usuarios2Component },
      
    ]
  },
  { path: 'Login', component: LoginComponent },
  {
    path: 'Admin', component: AdminComponent,
    children: [     
      { path: 'Usuarios', component: Usuarios2Component },
      { path: 'Inmuebles', component: InmueblesComponent },
      {path : 'NuevoInmueble', component : NuevoInmuebleComponent},
      {path: 'Disponible-alquiler', component : DisponibleAlquilerComponent},
      {path: 'Disponible-venta', component : DisponibleVentaComponent}
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: 'Comercial/Inicio' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
