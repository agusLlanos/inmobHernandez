import { Component, OnInit } from '@angular/core';
import { ApiInmueble } from 'src/app/service/api.inmueble';
import { inmueble } from 'src/app/models/inmueble';
import { getLocaleDateFormat } from '@angular/common';
import { propietario } from 'src/app/models/propietario';

@Component({
  selector: 'app-nuevo-inmueble',
  templateUrl: './nuevo-inmueble.component.html',
  styleUrls: ['./nuevo-inmueble.component.css']
})
export class NuevoInmuebleComponent {
  constructor(private ApiInmueble: ApiInmueble) { }
  dateToday: string = new Date().toISOString().split('T')[0]
  valorRadio: string;
  valorRadioButton: string;
  propietarios: propietario [] = [];
  prueba2 : string;

  ngOnInit(): void {
    
  }

  model: inmueble = new inmueble({
    id_tipoInmueble: null, id_motivo: null, fecha_ingreso: this.dateToday, antiguedad: '',
    calle: '', numero: null, id_ciudad: null, patio: false, cochera: false, balcon: false, terraza: false, pileta: false,
    lavadero: false, living: false, ascensor: false, aire_acond: false, comedor: false, cocina: false, amoblado: false,
    cloaca: false, cant_banios: null, cant_habit: null, observaciones: '', nombre: null, apellido: null, dni: null,
    telefono: null, fecha_nac: null, email: null, agua: false, calefaccion: false, gas: false, estado: 'alta', luz: false,
    id_propietario : null
  })


  onSubmit() {
    this.ApiInmueble.createNewInmueble(this.model).subscribe((Response: inmueble) => console.log(Response));
    console.log(this.model)
  };

  onChange(variable: string) {
    this.valorRadioButton = variable
    console.log(this.valorRadioButton)

    if(this.valorRadioButton == 'existe'){
      this.ApiInmueble.listarPropietarios().subscribe(data => {      
        data.propietario.forEach((prop: any) => {
         this.propietarios.push(new propietario(prop))
       }) 
 
     })
    }
  }
  prueba(){
    console.log(this.prueba2)
  }
  
}


/*


this.model = new inmueble({ nombre: '', apellido: '', telefono: '', email: '', tipo_usuario: '', fecha_nac: '' }) */




