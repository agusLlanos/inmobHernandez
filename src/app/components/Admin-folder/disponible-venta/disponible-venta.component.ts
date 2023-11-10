import { Component } from '@angular/core';
import { inmueble } from 'src/app/models/inmueble';
import { ApiInmueble } from 'src/app/service/api.inmueble';

@Component({
  selector: 'app-disponible-venta',
  templateUrl: './disponible-venta.component.html',
  styleUrls: ['./disponible-venta.component.css']
})
export class DisponibleVentaComponent {
  constructor(private ApiInmueble: ApiInmueble) { }
  inmuebles_para_Ventas: inmueble[];
  valorSelect: number = 0;

  ngOnInit(): void {
    this.listarVentas()
  }

  listarVentas() {
    this.inmuebles_para_Ventas = [];

    if (this.valorSelect == 0) {
      this.ApiInmueble.listarInmuebles_xVentas_disponibles().subscribe(data => {
        data.inmueble.forEach((inmue: any) => {
          this.inmuebles_para_Ventas.push(new inmueble(inmue))
        })
      })
      console.log(this.inmuebles_para_Ventas)
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
  var: number;
  onChange(variable: number) {
    this.var = variable;
    this.listarVentas();
  }
}
