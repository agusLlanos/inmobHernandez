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
  inmuebles_para_alquiler : inmueble [] = [];

  listarAlquileres(){
    this.ApiInmueble.listarInmuebles_xAlquiler_disponibles().subscribe(data => {      
       data.inmueble.forEach((inmue: any) => {
        this.inmuebles_para_alquiler.push(new inmueble(inmue))
      }) 
    })
    console.log(this.inmuebles_para_alquiler)
  }
}
