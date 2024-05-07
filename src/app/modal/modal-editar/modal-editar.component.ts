import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { propietario } from 'src/app/models/propietario';
import { ApiPropietario } from 'src/app/service/api.propietario';
import { ModalYaConfirmadoComponent } from '../modal-ya-confirmado/modal-ya-confirmado.component';

@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css']
})
export class ModalEditarComponent implements OnInit {
  @Input() public datos: any;

  ngOnInit(): void {
    this.traerDato();

  }
  constructor(public modal: NgbModal, private ngbModalRef: NgbActiveModal, private apiPropietario: ApiPropietario) { }

  model: propietario = new propietario({
    nombre: '', apellido: '',
    dni: null, telefono: '', email: '', fecha_nac: null
  })
  model2: propietario = new propietario({
    nombre: '', apellido: '',
    dni: null, telefono: '', email: '', fecha_nac: null
  })

  cant: propietario;
  dni: number;
  id: number = 0;
  bandera: boolean;
  date: any;
  validacionDni: boolean;
  msjValidacion: boolean = false;
  mensajeAlerta: string = '';

  campolleno() {

  }

  cerrar() {
    this.ngbModalRef.close()
  }


  traerDato() {
    this.id = this.datos.idSeleccionado
    this.listarPropxID(this.id)
    this.bandera = true;
  }

  validacion_xDNI(doc: number, id: number) {
    this.bandera = false;
    this.listarPropxID(id)
    this.dni = doc
  }

  updateProp() {

    this.apiPropietario.updatePropietario(this.model).subscribe((Response: any) => {
      console.log(Response)

      if (Response.success == true) {
        this.ngbModalRef.close();
        const x = this.modal.open(ModalYaConfirmadoComponent, {});
        x.componentInstance.datos = { titulo: 'Exito', cuerpo: 'Se ha modificado correctamente' }        

      } else {
        this.ngbModalRef.close();
        const x = this.modal.open(ModalYaConfirmadoComponent, {});
        x.componentInstance.datos = { titulo: 'Atención', cuerpo: 'Error inesperado', color: 'rojo' }
      }
    },
      error => {
        const x = this.modal.open(ModalYaConfirmadoComponent, {});
        x.componentInstance.datos = { titulo: 'Atención', cuerpo: 'Error inesperado', estado: 'error' }
      });
  }
  
  listarPropxID(id: number) {
    this.apiPropietario.listarProp_porID(id).subscribe(datos => {
      datos.propietario.forEach((p: any) => {
        if (this.bandera) {
          this.model = new propietario(p);
          this.date = new Date(this.model.fecha_nac).toISOString().split('T')[0]
        } else {
          this.model2 = new propietario(p);
          this.date = new Date(this.model2.fecha_nac).toISOString().split('T')[0]

          if (this.model.dni == this.model2.dni) {
            this.validacionDni = true;
          } else {
            this.validacionDni = false;
          }
          this.filtrarPropietx_dni();
        }
      })
    })
  }

  filtrarPropietx_dni() {
    if (this.validacionDni == false) {
      this.apiPropietario.filtrarPropxDNI(this.dni).subscribe((datos => {
        datos.propietario.forEach((p: any) => {
          if (p.cantidad == 1) {
            this.msjValidacion = true
            this.mensajeAlerta = "El DNI ingresado ya se encuentra registrado"

          } else {
            this.updateProp();
            console.log("apto para guardar")
          }
        })
      }))
    } else {
      this.updateProp();
      console.log("dni no se modifico")
    }

  }
}

