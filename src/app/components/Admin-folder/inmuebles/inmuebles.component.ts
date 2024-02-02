import { Component, OnInit,ViewChild } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { inmueble } from 'src/app/models/inmueble';
import {  ModalEditarComponent } from 'src/app/modal/modal-editar/modal-editar.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {
  constructor(private ApiService: ApiService, public modal : NgbModal) { }
  inmuebles : inmueble[] = [];

  ngOnInit(): void {    
    this.llenarData()
  }
  llenarData() {
    this.ApiService.listarInmueble().subscribe(data => {
      data.inmueble.forEach((inmue: any) => {
        this.inmuebles.push(new inmueble(inmue))        
      })
      console.log(this.inmuebles)
    })
  }
  // @ViewChild(ModalEditarComponent) child: ModalEditarComponent;
  id_seleccionado : number; 

  openModal(id : number){  
  const x= this.modal.open(ModalEditarComponent, { size: 'lg' });
  x.componentInstance.datos ={idSeleccionado: id}
  }

}
