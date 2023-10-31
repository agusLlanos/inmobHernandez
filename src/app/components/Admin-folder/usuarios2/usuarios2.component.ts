import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { usuario } from 'src/app/models/usuario';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-usuarios2',
  templateUrl: './usuarios2.component.html',
  styleUrls: ['./usuarios2.component.css']
})
export class Usuarios2Component implements OnInit {
  usuarios: usuario[] = [];
  mostrar: boolean = false;
  usuarioEditar: usuario = new usuario({});
  idUsuario: number;
  usu: [] = [];
  bandera: boolean;
  id: number;
  variable: number;

  @ViewChild("myModalInfo", { static: false }) myModalInfo: TemplateRef<any>;
  @ViewChild("myModalConf", { static: false }) myModalConf: TemplateRef<any>;
  @ViewChild("myModalCanc", { static: false }) myModalCanc: TemplateRef<any>;
  constructor(private ApiService: ApiService, private modalService: NgbModal) { }

  ngOnInit(): void {
    this.llenarData()

  }

  llenarData() {
    this.ApiService.getData().subscribe(data => {
      data.usuario.forEach((usu: any) => {
        this.usuarios.push(new usuario(usu))
      })

    })
  }

  editarUsuario(usuario: usuario) {
    /*  let nombreModificado =usuario.nombre
     let apellidoModificado = usuario.apellido
     let emailModificado = usuario.email
     let telModificado =usuario.telefono */

    this.usuarioEditar = JSON.parse(JSON.stringify(usuario))
    this.mostrar = true;

  }

  guardarEdicion() {
    const usu = this.usuarios.filter(us => us.id == this.usuarioEditar.id);

    usu.forEach(user => {
      if (user.nombre == this.usuarioEditar.nombre) {
        if (user.apellido == this.usuarioEditar.apellido) {
          if (user.dni == this.usuarioEditar.dni) {
            if (user.telefono == this.usuarioEditar.telefono) {
              if (user.email == this.usuarioEditar.email) {
                if (user.descripcion == this.usuarioEditar.descripcion) {
                  if (user.fecha_nac == this.usuarioEditar.fecha_nac) {
                    this.bandera = false;
                  } else {
                    this.bandera = true;
                  }
                }
                else {
                  this.bandera = true;
                }
              }
              else {
                this.bandera = true;
              }
            }
            else {
              this.bandera = true;
            }
          }
          else {
            this.bandera = true;
          }
        }
        else {
          this.bandera = true;
        }
      }
      else {
        this.bandera = true;
      }
    })

    if (this.bandera) {
      if (this.usuarioEditar.descripcion == 'inquilino') {
        this.usuarioEditar.tipo_usuario = 2
      }
      if (this.usuarioEditar.descripcion == 'propietario') {
        this.usuarioEditar.tipo_usuario = 1
      }
      if (this.usuarioEditar.descripcion == 'garante') {
        this.usuarioEditar.tipo_usuario = 3
      }
      this.ApiService.updateUser(this.usuarioEditar).subscribe(data => {
        console.log(this.usuarioEditar.descripcion)
        this.usuarios = [];
        this.llenarData()
        this.mostrar = false;

        this.modalService.open(this.myModalInfo);
      })
    } else {
      this.usuarios = [];
      this.llenarData();
      this.mostrar = false;
    }
  }

  cancelarEdicion(usuario: usuario) {
    this.usuarioEditar = JSON.parse(JSON.stringify(usuario))

    const us = this.usuarios.filter((element) => element.id == this.usuarioEditar.id);

    us.forEach(user => {
      if (user.nombre == this.usuarioEditar.nombre) {
        if (user.apellido == this.usuarioEditar.apellido) {
          if (user.dni == this.usuarioEditar.dni) {
            if (user.telefono == this.usuarioEditar.telefono) {
              if (user.email == this.usuarioEditar.email) {
                if (user.descripcion == this.usuarioEditar.descripcion) {
                  if (user.fecha_nac == this.usuarioEditar.fecha_nac) {
                    this.bandera = true;
                  } else {
                    this.bandera = false;
                  }
                } else {
                  this.bandera = false;
                }
              } else {
                this.bandera = false;
              }
            }
            else {
              this.bandera = false;
            }
          } else {
            this.bandera = false;
          }
        } else {
          this.bandera = false;
        }
      }
      else {
        this.bandera = false;
      }

      if (this.bandera) {
        this.usuarios = [];
        this.llenarData();
        this.mostrar = false;
      } else {
        this.modalService.open(this.myModalCanc).result.then(r => {
          if (r == 'si') {
            this.usuarios = [];
            this.llenarData();
            this.mostrar = false;
          } else {

          }
        })
      }
    })
  }
  eliminarUsuario(id: number) {
    this.usuarios = [];
    this.idUsuario = id;
    this.llenarData();
    this.mostrar = false;

    this.modalService.open(this.myModalConf).result.then(r => {
      if (r == 'si') {
        this.ApiService.deleteUser(this.idUsuario).subscribe(data => {

          this.usuarios = [];
          this.llenarData();
          this.mostrar = false;
        })
      } else {
        this.usuarios = [];
        this.llenarData();
        this.mostrar = false;
      }
    }, error => {
      console.log(error);
    });
  }

  closeResult = '';

  openLg(content: any) {

    this.modalService.open(content, { size: 'lg' }).result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  model: usuario = new usuario({ nombre: '', apellido: '', dni: '', telefono: '', email: '', tipo_usuario: '', fecha_nac: '' })

  onSubmit() {
    if(this.model.descripcion == 'propietario'){
      this.model.tipo_usuario = 1
    }
    if(this.model.descripcion == 'inquilino'){
      this.model.tipo_usuario = 2
    }
    if(this.model.descripcion == 'garante'){
      this.model.tipo_usuario = 3
    }
    this.ApiService.createUser(this.model).subscribe((Response: usuario) => console.log(Response));

    this.model = new usuario({ nombre: '', apellido: '', telefono: '', email: '', tipo_usuario: '', fecha_nac: '' })
    this.usuarios = [];
    this.llenarData();
    this.mostrar = false;

  }
}



