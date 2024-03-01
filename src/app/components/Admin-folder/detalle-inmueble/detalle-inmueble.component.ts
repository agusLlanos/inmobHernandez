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


@Component({
  selector: 'app-detalle-inmueble',
  templateUrl: './detalle-inmueble.component.html',
  styleUrls: ['./detalle-inmueble.component.css']
})
export class DetalleInmuebleComponent {
  constructor(private modalService: NgbModal, public ApiInmueble: ApiInmueble) { }

  @Input() id_inmueble: any = null;
  @Input() inmuebles_alquiler: any[];
  @Input() img_inmue: any[];

  @Output() volver = new EventEmitter<boolean>();
  bandera: boolean = true;
  inmueb: inmueble = new inmueble({});
  editable: boolean = true;
  nombreBoton: string = 'Editar';
  tipo_inmuebles: tipo_inmueble[] = [];
  listCiudad: ciudad[] = [];
  listMoneda: moneda[] = [];
  listMotivos: tipoMotivo[] = [];
  date: string = '';
  propietarios: propietario[] = [];
  result: any = null;

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
    this.filtrarIMG();
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

  listarDatosInmueble() {
    this.ApiInmueble.listarInmueble_porID(this.id_inmueble).subscribe(data => {
      data.inmueble.forEach((inm: any) => {
        this.inmueb = new inmueble(inm)
        this.date = new Date(this.inmueb.fecha_nac).toISOString().split('T')[0]
      })
    })
  }

  onNoClick(event: Event): void {
    event.preventDefault();
  }

  modificar() {
    if (this.editable == false) {
      this.nombreBoton = 'Editar'
      this.editable = true;
      console.log(this.inmueb)
      this.encontrarIdPropietario(this.inmueb.dni);
      this.updateInmueble();
      console.log(this.inmueb.fechaIngreso_date)

    } else {
      this.editable = false;
      this.nombreBoton = 'Guardar'
    }
  }

  id_propietario: number = 0;

  encontrarIdPropietario(dni: number) {
    this.result = this.propietarios.filter((prop) => prop.dni == dni);
    console.log(this.result)
    this.result.forEach((prop: any) => {
      this.id_propietario = prop.id_propietario
    })
    this.inmueb.id_propietario = this.id_propietario
    

  }
  prueba(event: Event) {
    if (this.editable == true) {
      this.onNoClick(event);
    }
  }
  listar_tipoInmuebles() {
    this.ApiInmueble.listar_tipoInmueble().subscribe(data => {
      data.tipo.forEach((tipo: any) => {
        this.tipo_inmuebles.push(new tipo_inmueble(tipo))
      })
      console.log(this.tipo_inmuebles)
    })
  }

  listar_ciudad() {
    this.ApiInmueble.listarCiudad().subscribe(data => {
      data.ciudad.forEach((ciud: ciudad) => {
        this.listCiudad.push(new ciudad(ciud))
      })
      console.log(this.listCiudad)
    })
  }

  listar_moneda() {
    this.ApiInmueble.listarMoneda().subscribe(data => {
      data.moneda.forEach((mon: moneda) => {
        this.listMoneda.push(new moneda(mon))
      })
      console.log(this.listMoneda)
    })
  }
  listar_motivos() {
    this.ApiInmueble.listarMotivos().subscribe(data => {
      data.motivos.forEach((mot: tipoMotivo) => {
        this.listMotivos.push(new tipoMotivo(mot))
      })
      console.log(this.listMotivos)
    })
  }

  listarPropietarios() {
    this.ApiInmueble.listarPropietarios().subscribe(data => {
      data.propietario.forEach((prop: any) => {
        this.propietarios.push(new propietario(prop))
      })
      console.log(this.propietarios)
    })
  }

  updateInmueble(){
    this.ApiInmueble.updateInmueble(this.inmueb).subscribe((Response: any) =>{
      console.log(Response)
    })
  }
  imagen: imagen_inmueble= new imagen_inmueble({});
  array_img: any[] = [];

  filtrarIMG() { 
    this.imagen = this.img_inmue.find((element) => element.id_inmueble == this.id_inmueble)
    
    /*this.personasMap = this.img_inmue.map(item => {
      return [item.id_inmueble, item]
    });
    var personasMapArr = new Map(this.personasMap);

    this.array_img = [...personasMapArr.values()];*/
console.log("algo")
    console.log(this.imagen)
    console.log("algo")
  }
}
