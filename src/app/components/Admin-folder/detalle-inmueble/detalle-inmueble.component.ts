import { Component, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { inmueble } from 'src/app/models/inmueble';
import { ApiInmueble } from 'src/app/service/api.inmueble';
import { tipo_inmueble } from 'src/app/models/tipo_inmueble';
import { ciudad } from 'src/app/models/ciudad';
import { moneda } from 'src/app/models/tipo_moneda';

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
  inmueb: inmueble[] = [];
  editable : boolean = true;
  nombreBoton : string = 'Editar';
  motivos : any [] = [{id: 1, motivo : 'venta'}, {id:2, motivo :'alquiler'}]
  tipo_inmuebles : tipo_inmueble [] = [];
  listCiudad : ciudad [] = [];
  listMoneda : moneda [] = [];
  var : string = '<i class="fa-solid fa-pen-to-square" style="color: #ffffff;"></i>'
  var2 : string = '<i class="fa-solid fa-check" style="color: #ffffff;"></i>'
  back() {
    this.volver.emit(this.bandera)
  }

  ngOnInit(): void {

    this.listarDatosInmueble();
    this.listar_ciudad();
    this.listar_tipoInmuebles();
    this.listar_moneda();
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
        this.inmueb.push(new inmueble(inm))
        
      })
      console.log(this.inmueb)
      console.log('hola')
    })
  }

  onNoClick(event: Event): void {
    event.preventDefault(); 
      
  }

  modificar(){
    if(this.editable == false){
      this.nombreBoton = 'Editar'
      this.editable = true;
    }else{
      this.editable = false;
      this.nombreBoton = 'Guardar'
      console.log(this.inmueb)
    }
    
  }

  prueba(event : Event){
    if(this.editable == true){
      this.onNoClick(event);
    }
  }
  listar_tipoInmuebles(){
    this.ApiInmueble.listar_tipoInmueble().subscribe(data =>{
      data.tipo.forEach((tipo : any) =>{
        this.tipo_inmuebles.push(new tipo_inmueble(tipo))
      })
      console.log(this.tipo_inmuebles)
    })
  }

  listar_ciudad(){
    this.ApiInmueble.listarCiudad().subscribe(data=>{
      data.ciudad.forEach((ciud : ciudad)=>{
        this.listCiudad .push(new ciudad(ciud))
      })
      console.log(this.listCiudad )
    })
  }

  listar_moneda(){
    this.ApiInmueble.listarMoneda().subscribe(data=>{
      data.moneda.forEach((mon : moneda)=>{
        this.listMoneda .push(new moneda(mon))
      })
      console.log(this.listMoneda )
    })
  }
}
