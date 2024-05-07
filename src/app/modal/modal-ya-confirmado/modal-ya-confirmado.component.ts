import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-ya-confirmado',
  templateUrl: './modal-ya-confirmado.component.html',
  styleUrls: ['./modal-ya-confirmado.component.css']
})
export class ModalYaConfirmadoComponent implements OnInit { 
  constructor(private ngbModalRef: NgbActiveModal) { }

ngOnInit(): void {
  this.cargarDato()
}
  titulo: string = '';
  cuerpo: string = '';
  //aviso: string = '';
  colorBtn = 'btn-success'

  @Input() public datos: any;
  actualizar : boolean;
    
  cerrar() {
    this.actualizar = false;
    this.ngbModalRef.close(this.actualizar);
  }

  cargarDato() {    
    this.cuerpo = this.datos.cuerpo    
    this.titulo = this.datos.titulo
    
    if(this.datos.color == 'rojo'){
      this.colorBtn = 'btn-danger'
    }
   
  }
}
