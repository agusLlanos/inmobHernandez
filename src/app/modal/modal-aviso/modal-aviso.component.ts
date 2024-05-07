import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { inmueble } from 'src/app/models/inmueble';
import { ApiInmueble } from 'src/app/service/api.inmueble';
import { ModalYaConfirmadoComponent } from '../modal-ya-confirmado/modal-ya-confirmado.component';

@Component({
  selector: 'app-modal-aviso',
  templateUrl: './modal-aviso.component.html',
  styleUrls: ['./modal-aviso.component.css']
})
export class ModalAvisoComponent implements OnInit {
  constructor(private ngbModalRef: NgbActiveModal, private apiInmue: ApiInmueble,
    private modal: NgbModal) { }

  ngOnInit(): void {
    this.cargarDato();    
  }

  @Input() public datos: any;

  cerrar() {
    this.ngbModalRef.close();
  }

  titulo: string = '';
  cuerpo: string = '';
  //aviso: string = '';
  colorBtn = 'btn-success'
  id: number;


  cargarDato() {
    this.cuerpo = this.datos.cuerpo
    this.titulo = this.datos.titulo
    this.model.id_inmueble = this.datos.idSeleccionado
    this.model.estado = this.datos.estado     

  } 

  model: inmueble = new inmueble({ id_inmueble: '', estado: '' });  
color : string;

  changeEstadoInmue() {  
if(this.model.estado == 'baja'){
this.color = 'rojo'
}else{
  this.color = 'verde'
}


      this.apiInmue.updateEstadoInmue(this.model).subscribe((Response : any) => {
        console.log(Response)
         if (Response.success == true) {
          this.ngbModalRef.close();
          const x = this.modal.open(ModalYaConfirmadoComponent, {});
          x.componentInstance.datos = { titulo: 'Exito!!', cuerpo: `El inmueble se ha dado de ${this.model.estado} de manera correcta`
          , color : this.color }
        } 
      })
  
  }

}

