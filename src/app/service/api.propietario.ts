import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { propietario } from '../models/propietario';

@Injectable({
    providedIn: 'root'
})

export class ApiPropietario {
    constructor(private http: HttpClient) { }

    urlListarPropxID = '';
    urlUpdateProp = 'https://localhost:7141/propietario/modificarPropietario';
    urlFiltrarPropxDNI = '';
    urlNuevoProp = 'https://localhost:7141/propietario/nuevoPropietario';

    public listarProp_porID(id: any): Observable<any> {
        this.urlListarPropxID = 'https://localhost:7141/propietario/listarPropxID'
        this.urlListarPropxID = `${this.urlListarPropxID}?id_propietario=${id}`
        return this.http.get(this.urlListarPropxID);
    }
    public updatePropietario(prop: propietario): Observable<propietario> {
        return this.http.put<propietario>(this.urlUpdateProp, prop);
    }

    public filtrarPropxDNI(dni: any): Observable<any> {
        this.urlFiltrarPropxDNI = 'https://localhost:7141/propietario/filtrarProp_xDNI'
        this.urlFiltrarPropxDNI = `${this.urlFiltrarPropxDNI}?dni=${dni}`
        return this.http.get(this.urlFiltrarPropxDNI);
    }
    public NuevoPropietario(p: propietario): Observable<propietario> {
        return this.http.post<any>(this.urlNuevoProp, p);
    }
}