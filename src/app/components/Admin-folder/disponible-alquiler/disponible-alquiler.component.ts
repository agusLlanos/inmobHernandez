import { Component } from '@angular/core';
import { ApiInmueble } from 'src/app/service/api.inmueble';
import { inmueble } from 'src/app/models/inmueble';
import { imagen_inmueble } from 'src/app/models/imagen_inmueble';
import { ApiImagen } from 'src/app/service/api.imagen';

@Component({
  selector: 'app-disponible-alquiler',
  templateUrl: './disponible-alquiler.component.html',
  styleUrls: ['./disponible-alquiler.component.css']
})
export class DisponibleAlquilerComponent {
  constructor(private ApiInmueble: ApiInmueble, private apiImagen : ApiImagen) { }

  ngOnInit(): void {
    this.listarAlquileres();
    //this.listarImg_Inmuebles();
  }

  inmuebles_para_alquiler: inmueble[];
  valorSelect: number = 0;
  bandera: boolean = true;
  id_inmueble: number;
  var: number = 0;
  img_inmue: imagen_inmueble[] = [];
  id_seleccionado : number;
  contadorAlquiler:number = 0;

  listarAlquileres() {
    this.inmuebles_para_alquiler = [];

    if (this.valorSelect == 0) {      
      this.ApiInmueble.listarInmuebles_xAlquiler_disponibles().subscribe(data => {
        data.inmueble.forEach((inmue: any) => {
          this.inmuebles_para_alquiler.push(new inmueble(inmue))
        })
        this.contadorAlquiler = this.inmuebles_para_alquiler.length
        this.cargarImg()        
        console.log(this.inmuebles_para_alquiler)  
      })
      
    }
    if (this.valorSelect == 1) {
      this.ApiInmueble.listarInmuebles_xAlquiler_disponibles_desc().subscribe(data => {
        data.inmueble.forEach((inmue: any) => {
          this.inmuebles_para_alquiler.push(new inmueble(inmue))
        })
        this.cargarImg()
      })
    }
    if (this.valorSelect == 2) {
      this.ApiInmueble.listarInmuebles_xAlquiler_disponibles_asc().subscribe(data => {
        data.inmueble.forEach((inmue: any) => {
          this.inmuebles_para_alquiler.push(new inmueble(inmue))
        })
        this.cargarImg()
      })
    }
  }

  cargarImg(){
    this.inmuebles_para_alquiler.forEach((inm : inmueble) =>{
      this.apiImagen.listarImagen_porID(inm.id_inmueble).subscribe(data =>{
        data.imagen.forEach((img : imagen_inmueble) =>{
          inm.imagen = new imagen_inmueble(img)
        })            
      })          
    }) 
  }


 
/*
  personasMap: any[] = [];

  listarImg_Inmuebles() {
    this.img_inmue = [];

    this.ApiInmueble.listar_img_inmuebles().subscribe(data => {
      data.img_inmueble.forEach((inmue: any) => {
        this.img_inmue.push(new imagen_inmueble(inmue))
      })
      //this.filtrarIMG();
    })
    console.log(this.img_inmue);
  }

  array_img: any[] ;

  filtrarIMG() {
    this.personasMap = this.img_inmue.map(item => {
      return [item.id_inmueble, item]
    });
    var personasMapArr = new Map(this.personasMap);

    this.array_img = [...personasMapArr.values()];
    console.log("hola")
    console.log(this.array_img);
  }
*/
  onChange(variable: number) {
    this.var = variable;
    this.listarAlquileres();
  }

  verDetalle(id: number) {
    this.bandera = false;
    this.id_seleccionado = id;
  }

  volver(flag : boolean){
    this.bandera = flag;
    this.listarAlquileres();
  }
}
