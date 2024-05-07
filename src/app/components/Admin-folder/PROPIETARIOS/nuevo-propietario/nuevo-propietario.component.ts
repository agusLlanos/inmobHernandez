import { Component, OnInit } from '@angular/core';
import { propietario } from 'src/app/models/propietario';
import { ApiPropietario } from 'src/app/service/api.propietario';
import { ModalYaConfirmadoComponent } from 'src/app/modal/modal-ya-confirmado/modal-ya-confirmado.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-nuevo-propietario',
  templateUrl: './nuevo-propietario.component.html',
  styleUrls: ['./nuevo-propietario.component.css']
})
export class NuevoPropietarioComponent implements OnInit {
  constructor(private apiProp: ApiPropietario, private modal: NgbModal) { }

  ngOnInit(): void {

  }

  model: propietario = new propietario({
    nombre: '', apellido: '',
    dni: null, telefono: '', email: '', fecha_nac: null
  })
  validar: propietario;

  Registrar() {
    this.apiProp.NuevoPropietario(this.model).subscribe((Response: any) => {
      console.log(Response)
      if (Response.success == true) {
        const x = this.modal.open(ModalYaConfirmadoComponent, {});
        x.componentInstance.datos = {
          titulo: 'Exito!!', cuerpo: 'Se ha dado de alta nuevo propietario'
        }
        x.closed.subscribe(data =>{
          this.model = new propietario({
            nombre: '', apellido: '',
            dni: null, telefono: '', email: '', fecha_nac: null
          })
        })
      }
    })
  }

  msjValidacion: boolean = false;
  mensajeAlerta: string = ''
  type: string;

  verificarCampos() {
    if (this.model.nombre != '') {
      if (this.model.apellido != '') {
        if (this.model.dni != null) {
          if (this.model.telefono != '') {
            this.filtrarProp_xDni(this.model.dni)
          } else {
            this.msjValidacion = true;
            this.mensajeAlerta = 'El telefono no puede quedar vacio'
            this.type = 'danger'
          }
        } else {
          this.msjValidacion = true;
          this.mensajeAlerta = 'El DNI no puede quedar vacio'
          this.type = 'danger'
        }
      } else {
        this.msjValidacion = true;
        this.mensajeAlerta = 'El apellido no puede quedar vacio'
        this.type = 'danger'
      }
    }
    else {
      this.msjValidacion = true;
      this.mensajeAlerta = 'El nombre no puede quedar vacio'
      this.type = 'danger'
    }

  }
  filtrarProp_xDni(dni: number) {
    this.apiProp.filtrarPropxDNI(dni).subscribe((datos: any) => {
      datos.propietario.forEach((p: any) => {
        this.validar = new propietario(p)
      })
      if (this.validar.cantidad >= 1) {
        this.msjValidacion = true;
        this.mensajeAlerta = 'El DNI ingresado ya se encuentra registrado'
        this.type = 'danger'
      } else {
        this.Registrar();
      }
    })
  }
}
