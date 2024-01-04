import { Component, Input, ViewChild, TemplateRef, Output, EventEmitter } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-detalle-inmueble',
  templateUrl: './detalle-inmueble.component.html',
  styleUrls: ['./detalle-inmueble.component.css']
})
export class DetalleInmuebleComponent {
  constructor( private modalService: NgbModal){}

@Input() id_inmueble : number;
@Input() inmuebles_alquiler : any [];
@Input() img_inmue : any[];

@Output() volver = new EventEmitter<boolean>();
bandera : boolean = true;

back(){
this.volver.emit(this.bandera)
}

ngOnInit(): void {
  this.verInmuebles()
}

verInmuebles(){ 
  console.log(this.inmuebles_alquiler); 
}

@ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;
nombre_img : string = '';

muestraImagen(imagen : string){
  this.nombre_img = imagen
  this.modalService.open(this.myModalInfo);
}
}
