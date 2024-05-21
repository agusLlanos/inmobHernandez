import { Component, ViewChild, ElementRef } from '@angular/core';
import { ApiInmueble } from 'src/app/service/api.inmueble';
import { ApiService } from 'src/app/service/api.service';
import { inmueble } from 'src/app/models/inmueble';
import { getLocaleDateFormat } from '@angular/common';
import { propietario } from 'src/app/models/propietario';
import { NgbAlertConfig, NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from 'src/app/modal/modalExito/modal.component';
import { imagen_inmueble } from 'src/app/models/imagen_inmueble';
import { NgbAccordionConfig } from '@ng-bootstrap/ng-bootstrap';
import { ciudad } from 'src/app/models/ciudad';
import { tipo_inmueble } from 'src/app/models/tipo_inmueble';
import { ModalYaConfirmadoComponent } from 'src/app/modal/modal-ya-confirmado/modal-ya-confirmado.component';

@Component({
  selector: 'app-nuevo-inmueble',
  templateUrl: './nuevo-inmueble.component.html',
  styleUrls: ['./nuevo-inmueble.component.css']
})
export class NuevoInmuebleComponent {
  constructor(private ApiInmueble: ApiInmueble, private configAlert: NgbAlertConfig,
    private modalService: NgbModal, private ApiService: ApiService, private confi: NgbAccordionConfig,
    private modal: NgbModal) { }

  dateToday: string = new Date().toISOString().split('T')[0]
  valorRadio: string;
  valorRadioButton: string;
  propietarios: propietario[] = [];
  inmuebles: inmueble[] = [];
  prueba2: string;
  valorAlert: boolean = true;
  result: any;
  id_inmueble1: number;
  fileLoaded: any[] = [];
  file: any[] = [];
  test: any;
  nombre: string[] = [];
  nombreImagen: string;

  imagen: imagen_inmueble = new imagen_inmueble({
    descripcion: '', Archivo: [], id_inmueble: null
  });
  imagenes: imagen_inmueble = new imagen_inmueble({
    descripcion: '', Archivo: [], id_inmueble: null
  });

  //imagenes: imagen_inmueble[] = [];

  ngOnInit(): void {
    this.listarPropietarios();
    this.listarInmuebles();
    this.listarCiudades();
    this.listarTipoInmue();
  }

  model: inmueble = new inmueble({
    id_tipoInmueble: null, id_motivo: null, fecha_ingreso: this.dateToday, antiguedad: null,
    calle: null, numero: null, id_ciudad: null, patio: false, cochera: false, balcon: false, terraza: false, pileta: false,
    lavadero: false, living: false, ascensor: false, aire_acond: false, comedor: false, cocina: false, amoblado: false,
    cloaca: false, cant_banios: 0, cant_habit: 0, observaciones: '', nombre: null, apellido: null, dni: null,
    telefono: null, fecha_nac: null, email: null, agua: false, calefaccion: false, gas: false, estado: 'alta', luz: false,
    id_propietario: null, costo_inicial: null, id_moneda: null
  })

  @ViewChild(ModalComponent) child: ModalComponent;

  variable: any;
  ult_id_inmue: any;

  prueba(value: any) {
    console.log(value)
  }

  cargarNuevoInmueble() {
    if (this.valorRadioButton == 'nuevo') {
      this.result = this.propietarios.filter((prop) => prop.dni == this.model.dni);
      if (this.result.length >= 1) {
        this.valorAlert = false;
      } else {
        this.registrarInmueble();
      }
    } else {
      this.registrarInmueble();
    }
  };

  registrarInmueble() {
    console.log(this.model)
    this.ApiInmueble.createNewInmueble(this.model).subscribe((Response: any) => {
      console.log(Response.success)
      if (Response.success) {
        this.guardarImagenPerfil(Response.id_inmueble)
      }
    });
  }

  guardarImagenPerfil(id: number) {
    this.imagen.id_inmueble = id;
    this.imagen.imagenPerfil = true;

    if (this.file.length >= 0) {
      for (const vari in this.file) {
        if (typeof this.file[vari] == 'object') {
          this.imagen.Archivo.push(this.file[vari]);
          console.log(this.imagen)
        } else {
          console.log('error')
        }
      }
      this.ApiInmueble.cargarImagen(this.imagen).subscribe((Response: any) => {
        console.log(Response.success)
        if (Response.success) {
          this.guardarImagenes(id)
        }
      });

    } else {
      this.guardarImagenes(id)
    }
  }

  guardarImagenes(id: number) {
    this.imagenes.id_inmueble = id;
    this.imagenes.imagenPerfil = false;

    if (this.fileLoaded.length >= 0) {
      for (const vari in this.fileLoaded) {
        if (typeof this.fileLoaded[vari] == 'object') {
          this.imagenes.Archivo.push(this.fileLoaded[vari]);
          console.log(this.imagenes)
        }
      }
      this.ApiInmueble.cargarImagen(this.imagenes).subscribe((Response: any) => {
        console.log(Response.success);
        if (Response.success) {
          this.abrirModal();
        }
      })

    }else{
      this.abrirModal();
    }
  }
  abrirModal(){
    const x = this.modal.open(ModalYaConfirmadoComponent, {});
    x.componentInstance.datos = {
      titulo: 'Exito!!', cuerpo: 'Se ha dado de alta nuevo inmueble'
    }
    x.closed.subscribe(data => {
      this.limpiarCampos();
    })
  }

  bandera: number = 0;

  loadFileImage(event: any, bandera: number) {

    if (bandera == 1) {
      if (event.target.files && event.target.files.length > 0) {
        this.file = event.target.files

        console.log(this.file)
      }
    } else {
      if (event.target.files && event.target.files.length > 0) {
        this.fileLoaded = event.target.files
        console.log(this.fileLoaded)
      }
    }
  }
  onChange(variable: string) {
    this.valorRadioButton = variable

    if (variable == 'existe') {
      this.listarPropietarios()
    }
  }

  listarPropietarios() {
    this.ApiInmueble.listarPropietarios().subscribe(data => {
      data.propietario.forEach((prop: any) => {
        this.propietarios.push(new propietario(prop))
      })
      //console.log(this.propietarios)
    })
  }

  listarInmuebles() {
    this.ApiService.listarInmueble().subscribe(data => {
      data.inmueble.forEach((inmue: any) => {
        this.inmuebles.push(new inmueble(inmue))
      })
      //console.log(this.inmuebles)
    })
  }
  ciudades: ciudad[] = [];

  listarCiudades() {
    this.ApiInmueble.listarCiudad().subscribe(data => {
      data.ciudad.forEach((c: ciudad) => {
        this.ciudades.push(new ciudad(c))
      })
      //console.log(this.ciudades)
    })
  }

  tipo_inm: tipo_inmueble[] = [];

  listarTipoInmue() {
    this.ApiInmueble.listar_tipoInmueble().subscribe(data => {
      data.tipo.forEach((t: tipo_inmueble) => {
        this.tipo_inm.push(new tipo_inmueble(t))
      })
      //console.log(this.tipo_inm)
    })
  }

  //@ViewChild('formFileSm') fileInput:ElementRef;
  @ViewChild('formFileSm', { static: false }) fileInput: ElementRef; 

  limpiarCampos(){    
  this.model = new inmueble({
    id_tipoInmueble: null, id_motivo: null, fecha_ingreso: this.dateToday, antiguedad: null,
    calle: null, numero: 0, id_ciudad: null, patio: false, cochera: false, balcon: false, terraza: false, pileta: false,
    lavadero: false, living: false, ascensor: false, aire_acond: false, comedor: false, cocina: false, amoblado: false,
    cloaca: false, cant_banios: 0, cant_habit: 0, observaciones: '', nombre: null, apellido: null, dni: null,
    telefono: null, fecha_nac: null, email: null, agua: false, calefaccion: false, gas: false, estado: 'alta', luz: false,
    id_propietario: null, costo_inicial: null, id_moneda: null
  })
  //this.fileInput.nativeElement.value = null;
  }
  

 

}




