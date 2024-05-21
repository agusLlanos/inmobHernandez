import { Component } from '@angular/core';
import { ApiImagen } from 'src/app/service/api.imagen';
import { imagen_inmueble } from 'src/app/models/imagen_inmueble';
import { ModalYaConfirmadoComponent } from 'src/app/modal/modal-ya-confirmado/modal-ya-confirmado.component';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-carga-imagenes',
  templateUrl: './carga-imagenes.component.html',
  styleUrls: ['./carga-imagenes.component.css']
})
export class CargaImagenesComponent {
  constructor(private apiImagen: ApiImagen, private modal: NgbModal) { }
  bandera: any;
  id_inmueble: number;
  file: any[] = [];
  fileLoaded: any[] = [];

  loadFileImage(event: any, bandera: number) {
    if (bandera == 1) {
      if (event.target.files && event.target.files.length > 0) {
        this.file = event.target.files

        console.log(this.file)
      }
    } else {
      if (event.target.files && event.target.files.length > 0) {
        this.fileLoaded = event.target.files
        console.log(this.fileLoaded)
      }
    }
  }

  imagen: imagen_inmueble = new imagen_inmueble({
    descripcion: '', Archivo: [], id_inmueble: null
  });
  imagenes: imagen_inmueble = new imagen_inmueble({
    descripcion: '', Archivo: [], id_inmueble: null
  });

  modificarImagenPerfil(id: number) {
    this.imagen.id_inmueble = id;

    if (this.file.length >= 1) {
      for (const vari in this.file) {
        if (typeof this.file[vari] == 'object') {
          this.imagen.Archivo.push(this.file[vari]);
        }
      }
      this.apiImagen.updateImagen_Perfil(this.imagen).subscribe((Response: any) => {
        console.log(Response.success)
        if (Response.success) {
          this.cargarImagenesInmue(id);
        } else {
          this.abrirModal(this.titulo = 'Falló', this.cuerpo = 'Se ha producido un error', this.color = 'rojo')
        }
      })
      //console.log(this.imagen)
    } else {
      this.cargarImagenesInmue(id);
    }
  }

  cargarImagenesInmue(id: number) {
    this.imagenes.id_inmueble = id;
    this.imagenes.imagenPerfil = false;

    if (this.fileLoaded.length >= 1) {
      for (const vari in this.fileLoaded) {
        if (typeof this.fileLoaded[vari] == 'object') {
          this.imagenes.Archivo.push(this.fileLoaded[vari]);
        }
      }
      console.log(this.imagenes)
      this.apiImagen.cargarImagen(this.imagenes).subscribe((Response: any) => {
        if (Response.success) {
          this.titulo = 'Exito', this.cuerpo = 'Se ha modificado correctamente'
          this.abrirModal(this.titulo, this.cuerpo, this.color)
        }
      })
    }
  }
  titulo: string = ''
  color: string = '';
  cuerpo: string = '';

  abrirModal(titulo: string, cuerpo: string, color: string) {
    const x = this.modal.open(ModalYaConfirmadoComponent, {});
    x.componentInstance.datos = {
      titulo: titulo, cuerpo: cuerpo, color: color
    }
    x.closed.subscribe(data => {
      this.limpiarCampos();
    })
  }
  limpiarCampos() {

  }

}
