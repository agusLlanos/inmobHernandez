import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inmueble } from '../models/inmueble';
import { propietario } from '../models/propietario';

@Injectable({
    providedIn: 'root'
})

export class ApiInmueble {
    constructor(private http: HttpClient) { }

    private urlApiPost = 'https://localhost:7141/inmueble/agregar'
    private urlApiGet = 'https://localhost:7141/propietario/listar';

    createNewInmueble(inmueb: inmueble): Observable<inmueble> {
        return this.http.post<any>(this.urlApiPost, inmueb);
    }     

    public listarPropietarios(): Observable<any>{
        return this.http.get<propietario>(this.urlApiGet)
    }



}