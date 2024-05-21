import { Component, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { inmueble } from 'src/app/models/inmueble';
import { ApiInmueble } from 'src/app/service/api.inmueble';
import { tipo_inmueble } from 'src/app/models/tipo_inmueble';
import { ciudad } from 'src/app/models/ciudad';
import { moneda } from 'src/app/models/tipo_moneda';
import { tipoMotivo } from 'src/app/models/tipo_motivo';
import { propietario } from 'src/app/models/propietario';
import { imagen_inmueble } from 'src/app/models/imagen_inmueble';
import { ApiImagen } from 'src/app/service/api.imagen';
import { findIndex, identity } from 'rxjs';


@Component({
  selector: 'app-detalle-inmueble',
  templateUrl: './detalle-inmueble.component.html',
  styleUrls: ['./detalle-inmueble.component.css']
})
export class DetalleInmuebleComponent {
  constructor(private modalService: NgbModal, public ApiInmueble: ApiInmueble,
    private apiImagen: ApiImagen) { }

  @Input() id_inmueble: any = null;
  @Input() inmuebles_alquiler: any[];
  @Input() img_inmue: any[];
  @Input() estado_inm: any = null;

  @Output() volver = new EventEmitter<boolean>();
  bandera: boolean = true;
  inmueb: inmueble = new inmueble({ cant_banios: 0, cant_habit: 0 });
  editable: boolean = true;
  nombreBoton: string = 'Editar';
  tipo_inmuebles: tipo_inmueble[] = [];
  listCiudad: ciudad[] = [];
  listMoneda: moneda[] = [];
  listMotivos: tipoMotivo[] = [];
  date: string = '';
  propietarios: propietario[] = [];
  result: any = null;
  img: imagen_inmueble = new imagen_inmueble({});
  img_inmuee: imagen_inmueble[] = [];
  id_propietario: number = 0;
  imagen: imagen_inmueble = new imagen_inmueble({});
  array_img: any[] = [];
  personasMap: any[] = []
  habilitar: boolean = false;
  estado: any;

  back() {
    this.volver.emit(this.bandera)
  }

  ngOnInit(): void {

    this.listarDatosInmueble();
    this.listar_ciudad();
    this.listar_tipoInmuebles();
    this.listar_moneda();
    this.listar_motivos();
    this.listarPropietarios();
    // this.listarImgxID();
    this.filtrarIMG();
    this.cargarDato();
  }

  cargarDato() {
    this.estado = this.estado_inm
    if (this.estado == 'BAJA') {
      this.habilitarAlerta()
    }
  }
  habilitarAlerta() {
    this.habilitar = true;
  }

  verInmuebles() {
    console.log(this.inmuebles_alquiler);
  }

  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;
  nombre_img: string = '';


  muestraImagen(imagen: string) {
    this.nombre_img = imagen
    this.modalService.open(this.myModalInfo);
  }

  /*   openXl(content: TemplateRef<any>, imagen: string) {
      this.modalService.open(content, { size: 'xl' });
      this.nombre_img = imagen
    } */
  posic: number;
  openXl(content: TemplateRef<any>, pos: number) {
    this.modalService.open(content, { size: 'xl' });
    this.posic = pos
  }

  listarDatosInmueble() {
    this.ApiInmueble.listarInmueble_porID(this.id_inmueble).subscribe(data => {
      data.inmueble.forEach((inm: any) => {
        this.inmueb = new inmueble(inm)
        this.date = new Date(this.inmueb.fecha_nac).toISOString().split('T')[0]
      })
      console.log(this.inmueb)
    })
  }
  operador: string;
  cambiarImagen(op: string) {
    console.log(this.posic)
    if (op == 'sumar') {
      this.posic++;
      console.log('suma')
      console.log(this.posic)
    } else {
      this.posic--;
      
      console.log('restar')
      console.log(this.posic)
    }
  }

  /* listarImgxID(){
    this.apiImagen.listarImagen_porID(this.id_inmueble).subscribe(data =>{
      data.imagen.forEach((img : imagen_inmueble) =>{
        this.img = new imagen_inmueble(img)
      })      
    })
  } */

  onNoClick(event: Event): void {
    event.preventDefault();
  }

  modificar() {
    if (this.editable == false) {
      this.nombreBoton = 'Editar'
      this.editable = true;

      //this.encontrarIdPropietario(this.inmueb.dni);
      this.updateInmueble();

    } else {
      this.editable = false;
      this.nombreBoton = 'Guardar'
    }
  }
  muestra: any;
  updateInmueble() {
    console.log(this.inmueb)
    if (this.inmueb.cant_banios == null) {
      this.inmueb.cant_banios = 0
    }
    if (this.inmueb.cant_habit == null) {
      this.inmueb.cant_habit = 0
    }
    this.ApiInmueble.updateInmueble(this.inmueb).subscribe((Response: any) => {
      console.log(Response)
      if (Response.success) {
        this.listarDatosInmueble()
      }
    })
  }
  index: number = 0;

  filtrarIMG() {
    this.apiImagen.listarImagenes_porID(this.id_inmueble).subscribe(data => {
      data.imagen.forEach((img: imagen_inmueble) => {
        this.img_inmuee.push(new imagen_inmueble(img))
      })
      for (let i of this.img_inmuee) {
        this.img_inmuee[this.index].posicion = this.index;
        this.index++;
      }
      console.log(this.img_inmuee)
    })
  }

  /*  encontrarIdPropietario(dni: number) {
     this.result = this.propietarios.filter((prop) => prop.dni == dni);
 
     this.result.forEach((prop: any) => {
       this.id_propietario = prop.id_propietario
     })
     this.inmueb.id_propietario = this.id_propietario
   } */

  noEditable(event: Event) {
    if (this.editable == true) {
      this.onNoClick(event);
    }
  }
  listar_tipoInmuebles() {
    this.ApiInmueble.listar_tipoInmueble().subscribe(data => {
      data.tipo.forEach((tipo: any) => {
        this.tipo_inmuebles.push(new tipo_inmueble(tipo))
      })

    })
  }

  listar_ciudad() {
    this.ApiInmueble.listarCiudad().subscribe(data => {
      data.ciudad.forEach((ciud: ciudad) => {
        this.listCiudad.push(new ciudad(ciud))
      })

    })
  }

  listar_moneda() {
    this.ApiInmueble.listarMoneda().subscribe(data => {
      data.moneda.forEach((mon: moneda) => {
        this.listMoneda.push(new moneda(mon))
      })

    })
  }
  listar_motivos() {
    this.ApiInmueble.listarMotivos().subscribe(data => {
      data.motivos.forEach((mot: tipoMotivo) => {
        this.listMotivos.push(new tipoMotivo(mot))
      })

    })
  }

  listarPropietarios() {
    this.ApiInmueble.listarPropietarios().subscribe(data => {
      data.propietario.forEach((prop: any) => {
        this.propietarios.push(new propietario(prop))
      })

    })
  }


  /*
console.log(this.img_inmue)

  this.imagen = this.img_inmue.find((element) => element.id_inmueble == this.id_inmueble)
  
  this.personasMap = this.img_inmue.map(item => {
    return [item.id_inmueble, item]
  });
  var personasMapArr = new Map(this.personasMap);
 
  this.array_img = [...personasMapArr.values()];
*/


}
