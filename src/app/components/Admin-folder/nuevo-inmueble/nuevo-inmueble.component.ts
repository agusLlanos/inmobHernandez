import { Component, ViewChild } from '@angular/core';
import { ApiInmueble } from 'src/app/service/api.inmueble';
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
  constructor(private ApiInmueble: ApiInmueble, private configAlert:NgbAlertConfig,private modalService:NgbModal) { }
  
  dateToday: string = new Date().toISOString().split('T')[0]
  valorRadio: string;
  valorRadioButton: string;
  propietarios: propietario[] = [];
  prueba2: string;
  valorAlert : boolean = true;
  result : any;

  ngOnInit(): void {
    this.listarPropietarios();
  }  

  model: inmueble = new inmueble({
    id_tipoInmueble: null, id_motivo: null, fecha_ingreso: this.dateToday, antiguedad: '',
    calle: '', numero: null, id_ciudad: null, patio: false, cochera: false, balcon: false, terraza: false, pileta: false,
    lavadero: false, living: false, ascensor: false, aire_acond: false, comedor: false, cocina: false, amoblado: false,
    cloaca: false, cant_banios: null, cant_habit: null, observaciones: '', nombre: null, apellido: null, dni: null,
    telefono: null, fecha_nac: null, email: null, agua: false, calefaccion: false, gas: false, estado: 'alta', luz: false,
    id_propietario: null
  })

   @ViewChild(ModalComponent) child: ModalComponent;


  onSubmit() {
    
    if (this.valorRadioButton == 'nuevo') {      
      this.result = this.propietarios.filter((prop) => prop.dni == this.model.dni);
      if(this.result.length>=1){
      this.valorAlert = false;      
      }else{
        this.ApiInmueble.createNewInmueble(this.model).subscribe((Response: inmueble) => console.log(Response));
        this.valorAlert = true;
        this.child.showModal()        
      }      
    }  
    
  };

  onChange(variable: string) {
    this.valorRadioButton = variable

    if (this.valorRadioButton == 'existe') {
      this.listarPropietarios()
    }
  }

  listarPropietarios(){
    this.ApiInmueble.listarInmuebles_xAlquiler_disponibles().subscribe(data => {
      data.propietario.forEach((prop: any) => {
        this.propietarios.push(new propietario(prop))
      })
    })
  }

  test : any;
  nombre : string [] = [];
  nombreImagen : string;

 imagen: imagen_inmueble = new imagen_inmueble({
  descripcion : 'baño casa id 2', Archivo : '', id_inmueble : 2, ruta :''
  })

  prueba(){
    //console.log(this.test)
    //this.nombre = this.test.split("\\"); 
    this.imagen.Archivo = this.fileLoaded;   
    console.log(this.imagen)
    this.ApiInmueble.cargarImagen(this.imagen).subscribe((Response: imagen_inmueble) => console.log(Response));
  }

  fileLoaded : any;

  loadFileImage(event: any) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      this.fileLoaded = event.target.files[0];
      //reader.readAsDataURL(event.target.files);
      console.log(this.fileLoaded)
    }    
  }
}




