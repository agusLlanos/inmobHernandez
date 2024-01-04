import { Component, ViewChild } from '@angular/core';
import { ApiInmueble } from 'src/app/service/api.inmueble';
import { ApiService } from 'src/app/service/api.service';
import { inmueble } from 'src/app/models/inmueble';
import { getLocaleDateFormat } from '@angular/common';
import { propietario } from 'src/app/models/propietario';
import { NgbAlertConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modalExito/modal.component';
import { imagen_inmueble } from 'src/app/models/imagen_inmueble';

@Component({
  selector: 'app-nuevo-inmueble',
  templateUrl: './nuevo-inmueble.component.html',
  styleUrls: ['./nuevo-inmueble.component.css']
})
export class NuevoInmuebleComponent {
  constructor(private ApiInmueble: ApiInmueble, private configAlert: NgbAlertConfig, private modalService: NgbModal, private ApiService: ApiService) { }

  dateToday: string = new Date().toISOString().split('T')[0]
  valorRadio: string;
  valorRadioButton: string;
  propietarios: propietario[] = [];
  inmuebles: inmueble[] = [];
  prueba2: string;
  valorAlert: boolean = true;
  result: any;

  ngOnInit(): void {
    this.listarPropietarios();
    this.listarInmuebles();  
  }

  model: inmueble = new inmueble({
    id_tipoInmueble: null, id_motivo: null, fecha_ingreso: this.dateToday, antiguedad: '',
    calle: '', numero: null, id_ciudad: null, patio: false, cochera: false, balcon: false, terraza: false, pileta: false,
    lavadero: false, living: false, ascensor: false, aire_acond: false, comedor: false, cocina: false, amoblado: false,
    cloaca: false, cant_banios: null, cant_habit: null, observaciones: '', nombre: null, apellido: null, dni: null,
    telefono: null, fecha_nac: null, email: null, agua: false, calefaccion: false, gas: false, estado: 'alta', luz: false,
    id_propietario: null, costo_inicial: null
  })

  @ViewChild(ModalComponent) child: ModalComponent;

  variable: any;
  ult_id_inmue: any;

  onSubmit() {

    if (this.valorRadioButton == 'nuevo') {
      this.result = this.propietarios.filter((prop) => prop.dni == this.model.dni);
      if (this.result.length >= 1) {
        this.valorAlert = false;
      } else {
        this.ApiInmueble.createNewInmueble(this.model).subscribe((Response: any) => {
          console.log(Response)
          this.guardarImagen(Response.id_inmueble)
        }
        );
        this.valorAlert = true;
        this.child.showModal()


        /* this.ult_id_inmue = null;
 
         this.variable = this.inmuebles.at(-1);
         this.ult_id_inmue = this.variable.id_inmueble + 1;     */


      }
    } else {
      //completar en caso de que sea existente
    }


  };

  onChange(variable: string) {
    this.valorRadioButton = variable

    if (this.valorRadioButton == 'existe') {
      this.listarPropietarios()
    }
  }

  listarPropietarios() {
    this.ApiInmueble.listarPropietarios().subscribe(data => {
      data.propietario.forEach((prop: any) => {
        this.propietarios.push(new propietario(prop))
      })
      console.log(this.propietarios)
    })
  }

  listarInmuebles() {
    this.ApiService.listarInmueble().subscribe(data => {
      data.inmueble.forEach((inmue: any) => {
        this.inmuebles.push(new inmueble(inmue))
      })
      console.log(this.inmuebles)
    })
  } 

  test: any;
  nombre: string[] = [];
  nombreImagen: string;

  imagen: imagen_inmueble = new imagen_inmueble({
    descripcion: null, Archivo: [], id_inmueble: null
  })

  imagenes: imagen_inmueble[] = [];

  guardarImagen(id: number) {

    this.imagen.id_inmueble = id;

    for (const vari in this.fileLoaded) {
      if (typeof this.fileLoaded[vari] == 'object') {
        this.imagen.Archivo.push(this.fileLoaded[vari]);
      }
    }

    this.ApiInmueble.cargarImagen(this.imagen).subscribe((Response: imagen_inmueble) => console.log(Response));

  }

  fileLoaded: any[] = [];

  loadFileImage(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.fileLoaded = event.target.files
      console.log(this.fileLoaded)
    }
    //this.fileLoaded = event.target.files[0];
    //reader.readAsDataURL(event.target.files);
    //console.log(this.target.files)

    //for (const vari in event.target.files) {
    // this.fileLoaded.push(event.target.files[vari]);
    //}



    /*
    event.target.files.forEach((vari : imagen_inmueble) => {
      this.fileLoaded.push(new imagen_inmueble(vari))
    })
    console.log(this.fileLoaded)*/


  }
}




