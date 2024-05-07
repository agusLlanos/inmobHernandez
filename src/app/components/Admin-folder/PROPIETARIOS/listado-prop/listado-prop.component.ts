import { Component, OnInit } from '@angular/core';
import { ApiInmueble } from 'src/app/service/api.inmueble';
import { propietario } from 'src/app/models/propietario';
import { ModalEditarComponent } from 'src/app/modal/modal-editar/modal-editar.component';  
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-listado-prop',
  templateUrl: './listado-prop.component.html',
  styleUrls: ['./listado-prop.component.css']
})
export class ListadoPropComponent implements OnInit {
constructor(private apiInmueble : ApiInmueble, private modal : NgbModal){}

  ngOnInit(): void {    
    this.listarProp();
  }

  prop : propietario [] = [];

  listarProp(){
    this.prop = [];

    this.apiInmueble.listarPropietarios().subscribe(data =>{
      data.propietario.forEach((el : any) => {
        this.prop.push(new propietario(el))
      });      
      console.log(this.prop)
    })
  }

  openModal_editar(id: number) {
    const x = this.modal.open(ModalEditarComponent, { size: 'lg', backdrop: 'static', keyboard: false });
    x.componentInstance.datos = { idSeleccionado: id}
    
    x.closed.subscribe(data => {
      this.listarProp()
    })
  }
}
