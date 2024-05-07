import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class ApiImagen {
    constructor(private http: HttpClient) { }

    private urlListarImagenxID = ''
    private urlListarImagenesxID = ''

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
}