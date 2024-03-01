import { Component, OnInit } from '@angular/core';
import { imagen_inmueble } from 'src/app/models/imagen_inmueble';
import { inmueble } from 'src/app/models/inmueble';
import { ApiInmueble } from 'src/app/service/api.inmueble';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {
  constructor(private ApiInmueble : ApiInmueble ) { }
  ngOnInit(): void {
    this.listarInmuebleVentas();
    this.listar_img_inmuebles();
  }
  inmueble_ventas : inmueble [] = [];

  listarInmuebleVentas(){
    this.ApiInmueble.listarVentas_Top8().subscribe(data =>{
      data.inmueble.forEach((inmue : any) =>{
        this.inmueble_ventas.push( new inmueble(inmue))
      })

    })
    console.log(this.inmueble_ventas)
  }

  img_inmue : imagen_inmueble [] = []

  listar_img_inmuebles(){
    this.ApiInmueble.listar_img_inmuebles().subscribe(data=>{
      data.img_inmueble.forEach((img : any) =>{
        this.img_inmue.push(new imagen_inmueble(img))
      })
    })
    console.log(this.img_inmue)
  }
}
