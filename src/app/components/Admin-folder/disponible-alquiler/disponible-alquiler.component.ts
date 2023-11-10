import { Component } from '@angular/core';
import { ApiInmueble } from 'src/app/service/api.inmueble';
import { inmueble } from 'src/app/models/inmueble';

@Component({
  selector: 'app-disponible-alquiler',
  templateUrl: './disponible-alquiler.component.html',
  styleUrls: ['./disponible-alquiler.component.css']
})
export class DisponibleAlquilerComponent {
  constructor(private ApiInmueble: ApiInmueble){}
  ngOnInit(): void {
    this.listarAlquileres()
  }
  inmuebles_para_alquiler : inmueble [];  
  valorSelect : number = 0;
  bandera : boolean = true;
  id_inmueble : number;

  listarAlquileres(){
    this.inmuebles_para_alquiler = [];

    if(this.valorSelect == 0){
      this.ApiInmueble.listarInmuebles_xAlquiler_disponibles().subscribe(data => {      
        data.inmueble.forEach((inmue: any) => {
         this.inmuebles_para_alquiler.push(new inmueble(inmue))
       }) 
     })     
    }
    if(this.valorSelect == 1){
      this.ApiInmueble.listarInmuebles_xAlquiler_disponibles_desc().subscribe(data => {      
        data.inmueble.forEach((inmue: any) => {
         this.inmuebles_para_alquiler.push(new inmueble(inmue))
       }) 
     })  
    }
    if(this.valorSelect == 2){
      this.ApiInmueble.listarInmuebles_xAlquiler_disponibles_asc().subscribe(data => {      
        data.inmueble.forEach((inmue: any) => {
         this.inmuebles_para_alquiler.push(new inmueble(inmue))
       }) 
     })  
    }
    
  }

  var : number = 0;
  onChange(variable : number){
    this.var = variable;    
    this.listarAlquileres();    
  } 

  verDetalle(id : number){
    this.bandera = false;
    this.id_inmueble = id;
  }
}
