import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { inmueble } from 'src/app/models/inmueble';
import { ModalEditarComponent } from 'src/app/modal/modal-editar/modal-editar.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ModalAvisoComponent } from 'src/app/modal/modal-aviso/modal-aviso.component';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {
  constructor(private ApiService: ApiService, public modal: NgbModal) { }
  inmuebles: inmueble[];
  bandera : boolean = true;
  estado_inm : any = '';

  ngOnInit(): void {
    this.llenarData()
    this.bandera = true;
  }
  llenarData() {    
    this.inmuebles = [];

    this.ApiService.listarInmueble().subscribe(data => {
      data.inmueble.forEach((inmue: any) => {
        if (inmue.estado == 'alta') {
          inmue.id_estado = 1
        } else {
          inmue.id_estado = 0
        }
        this.inmuebles.push(new inmueble(inmue))
      })
      this.cargarColorEstado()
    })
  }
  estad: string = 'alta';
  letra : string;

  cargarColorEstado() {
    this.inmuebles.forEach((i: inmueble) => {
      if (i.estado == this.estad.trim()) {
        i.estado = 'ALTA'
        i.colorEstado = 'text-success'
      } else {
        i.estado = 'BAJA'
        i.colorEstado = 'text-danger'        
        i.colorLetra =  'text-danger'        
      }
    })
  }

  // @ViewChild(ModalEditarComponent) child: ModalEditarComponent;
  id_seleccionado: number;

  test: any;
  i: number;

  openModalAviso(id_inmueble: number, estado: string) {
    if (estado == 'ALTA') {
      this.test = 'baja'
    } else {
      this.test = 'alta'
    }
    this.i = id_inmueble
    console.log(this.i)

    const x = this.modal.open(ModalAvisoComponent, {});
    x.componentInstance.datos = {
      idSeleccionado: this.i,
      estado: this.test,
      cuerpo: `Esta seguro que desea dar de ${this.test} este Inmueble?`
    }

    x.closed.subscribe(data => {
      this.llenarData()
    })
  }

  verDetalle(id : number, estado : any){
    this.id_seleccionado = id;
    this.bandera = false;
    this.estado_inm = estado;
  }
  volver(flag : boolean){
    this.bandera = flag;
  }

}
