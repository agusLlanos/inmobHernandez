import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inmueble } from '../models/inmueble';
import { propietario } from '../models/propietario';
import { imagen_inmueble } from '../models/imagen_inmueble';
    

@Injectable({
    providedIn: 'root'
})

export class ApiInmueble {
    constructor(private http: HttpClient) { }

    private urlApiPost = 'https://localhost:7141/inmueble/agregar'
    private urlApiGet = 'https://localhost:7141/propietario/listar';
    private urlApiPostImagen = 'https://localhost:7141/inmueble/cargarImagen';
    private urlApiGetAlquileres = 'https://localhost:7141/inmueble/listar_Alquileres_Disponibles'

    createNewInmueble(inmueb: inmueble): Observable<inmueble> {
        return this.http.post<any>(this.urlApiPost, inmueb);
    }     

    public listarPropietarios(): Observable<any>{
        return this.http.get<propietario>(this.urlApiGet)
    }  

    cargarImagen(inmue : imagen_inmueble): Observable<any>{
        const formData = new FormData(); 
        formData.append('file', (<File>inmue.Archivo));
        
        return this.http.post<any>(this.urlApiPostImagen,formData); 
    }

    public listarInmuebles_xAlquiler_disponibles(): Observable<any>{
        return this.http.get<inmueble>(this.urlApiGetAlquileres)
    }  



}