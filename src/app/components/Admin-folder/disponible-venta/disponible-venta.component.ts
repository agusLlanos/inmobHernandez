import { Component } from '@angular/core';
import { inmueble } from 'src/app/models/inmueble';
import { ApiInmueble } from 'src/app/service/api.inmueble';
import { imagen_inmueble } from 'src/app/models/imagen_inmueble';

@Component({
  selector: 'app-disponible-venta',
  templateUrl: './disponible-venta.component.html',
  styleUrls: ['./disponible-venta.component.css']
})
export class DisponibleVentaComponent {
  constructor(private ApiInmueble: ApiInmueble) { }

  inmuebles_para_Ventas: inmueble[];
  valorSelect: number = 0;
  var: number;
  img_inmue : imagen_inmueble [] = [];
  contadorVentas : number = 0;

  ngOnInit(): void {
    this.listarVentas();
    this.listarImg_Inmuebles();
  }

  listarVentas() {
    this.inmuebles_para_Ventas = [];

    if (this.valorSelect == 0) {
      this.ApiInmueble.listarInmuebles_xVentas_disponibles().subscribe(data => {
        data.inmueble.forEach((inmue: any) => {
          this.inmuebles_para_Ventas.push(new inmueble(inmue))          
        })        
        this.contadorVentas = this.inmuebles_para_Ventas.length;          
      })           
    }
    if(this.valorSelect == 1){
      this.ApiInmueble.listarInmuebles_xVentasdisponibles_desc().subscribe(data => {
        data.inmueble.forEach((inmue: any) => {
          this.inmuebles_para_Ventas.push(new inmueble(inmue))
        })
      })
    }
    if(this.valorSelect == 2){
      this.ApiInmueble.listarInmuebles_xVentas_disponibles_asc().subscribe(data => {
        data.inmueble.forEach((inmue: any) => {
          this.inmuebles_para_Ventas.push(new inmueble(inmue))
        })
      })
    }
  }

  onChange(variable: number) {
    this.var = variable;
    this.listarVentas();
  }

  listarImg_Inmuebles() {
    this.ApiInmueble.listar_img_inmuebles().subscribe(data => {
      data.img_inmueble.forEach((inmue: any) => {
        this.img_inmue.push(new imagen_inmueble(inmue))
      })
      console.log(this.img_inmue)
    })
  }
}
