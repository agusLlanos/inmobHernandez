import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { imagen_inmueble } from '../models/imagen_inmueble';

@Injectable({
    providedIn: 'root'
})

export class ApiImagen {
    constructor(private http: HttpClient) { }

    private urlListarImagenxID = '';
    private urlListarImagenesxID = '';
    private updateImagenPerfil = '';
    private urlApiPostImagen = '';

    public listarImagen_porID(id: any): Observable<any> {
        this.urlListarImagenxID = 'https://localhost:7141/Imagen/listarImagenxID'
        this.urlListarImagenxID = `${this.urlListarImagenxID}?id_inmueble=${id}`
        return this.http.get(this.urlListarImagenxID);
    }
    public listarImagenes_porID(id: any): Observable<any> {
        this.urlListarImagenesxID = 'https://localhost:7141/Imagen/listarImagenesxID'
        this.urlListarImagenesxID = `${this.urlListarImagenesxID}?id_inmueble=${id}`
        return this.http.get(this.urlListarImagenesxID);
    }

    updateImagen_Perfil(inmue: imagen_inmueble): Observable<any> {
        const formData = new FormData();

        inmue.Archivo.forEach(img => {
            formData.append('file', (<any>img))
        })
        this.updateImagenPerfil = 'https://localhost:7141/inmueble/modificarImagenPerfil'
        this.updateImagenPerfil = `${this.updateImagenPerfil}?id_inmueble=${inmue.id_inmueble}`
        return this.http.put<any>(this.updateImagenPerfil, formData);
    }

    cargarImagen(inmue: imagen_inmueble): Observable<any> {
        const formData = new FormData();

        inmue.Archivo.forEach(img => {
            formData.append('file', (<any>img))
        })
        this.urlApiPostImagen = 'https://localhost:7141/inmueble/cargarImagen'
        this.urlApiPostImagen = `${this.urlApiPostImagen}?id_inmueble=${inmue.id_inmueble}&imagenPerfil=${inmue.imagenPerfil}`
        return this.http.post<any>(this.urlApiPostImagen, formData);
    }
}