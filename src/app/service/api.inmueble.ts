import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { inmueble } from '../models/inmueble';
import { propietario } from '../models/propietario';
import { imagen_inmueble } from '../models/imagen_inmueble';
import { tipo_inmueble } from '../models/tipo_inmueble';
import { ciudad } from '../models/ciudad';
import { moneda } from '../models/tipo_moneda';
import { tipoMotivo } from '../models/tipo_motivo';


@Injectable({
    providedIn: 'root'
})

export class ApiInmueble {
    constructor(private http: HttpClient) { }

    private urlApiPost = 'https://localhost:7141/inmueble/agregar'
    private urlApiGet = 'https://localhost:7141/propietario/listar';
    private urlApiPostImagen = '';
    private urlApiGetAlquileres = 'https://localhost:7141/inmueble/listar_Alquileres_Disponibles'
    private urlApiGetAlquileres_asc = 'https://localhost:7141/inmueble/listar_Alquileres_Disponibles_asc'
    private urlApiGetAlquileres_desc = 'https://localhost:7141/inmueble/listar_Alquileres_Disponibles_desc'
    private urlApiGetVentas = 'https://localhost:7141/inmueble/listar_Ventas_Disponibles'
    private urlApiGetVentas_desc = 'https://localhost:7141/inmueble/listar_Ventas_Disponibles_desc'
    private urlApiGetVentas_asc = 'https://localhost:7141/inmueble/listar_Ventas_Disponibles_asc'
    private urlApiGet_img_inmueble = 'https://localhost:7141/inmueble/listarImagenes'
    private apiGet_InmuexID = '';
    private apiListTipoInmueble = 'https://localhost:7141/inmueble/listar_tipoInmuebles'
    private apiListCiudad = 'https://localhost:7141/inmueble/listarCiudades'
    private apiListMoneda = 'https://localhost:7141/inmueble/listar_tipoMonedas'
    private apiListMotivos = 'https://localhost:7141/inmueble/listar_tipoMotivos'
    private apiUpdateInmueble = 'https://localhost:7141/inmueble/modificar'
    private apiListarInmueble_VentasTop8 = 'https://localhost:7141/inmueble/listar_ventas'
    private apiUpdateEstadoInmue = 'https://localhost:7141/inmueble/cambiarEstado'

    createNewInmueble(inmueb: inmueble): Observable<inmueble> {
        return this.http.post<any>(this.urlApiPost, inmueb);
    }

    public listarPropietarios(): Observable<any> {
        return this.http.get<propietario>(this.urlApiGet)
    }

    cargarImagen(inmue: imagen_inmueble): Observable<any> {
        const formData = new FormData();

        inmue.Archivo.forEach(img => {
            formData.append('file', (<any>img))
        })
        this.urlApiPostImagen = 'https://localhost:7141/inmueble/cargarImagen'
        this.urlApiPostImagen = `${this.urlApiPostImagen}?id_inmueble=${inmue.id_inmueble}&descripcion=${inmue.descripcion}&imagenPerfil=${inmue.imagenPerfil}`
        return this.http.post<any>(this.urlApiPostImagen, formData);
    }

    public listarInmuebles_xAlquiler_disponibles(): Observable<any> {
        return this.http.get<inmueble>(this.urlApiGetAlquileres)
    }

    public listarInmuebles_xVentas_disponibles(): Observable<any> {
        return this.http.get<inmueble>(this.urlApiGetVentas)
    }

    public listarInmuebles_xAlquiler_disponibles_asc(): Observable<any> {
        return this.http.get<inmueble>(this.urlApiGetAlquileres_asc)
    }
    public listarInmuebles_xAlquiler_disponibles_desc(): Observable<any> {
        return this.http.get<inmueble>(this.urlApiGetAlquileres_desc)
    }
    public listarInmuebles_xVentas_disponibles_asc(): Observable<any> {
        return this.http.get<inmueble>(this.urlApiGetVentas_asc)
    }
    public listarInmuebles_xVentasdisponibles_desc(): Observable<any> {
        return this.http.get<inmueble>(this.urlApiGetVentas_desc)
    }

    public listar_img_inmuebles(): Observable<any> {
        return this.http.get<imagen_inmueble>(this.urlApiGet_img_inmueble)
    }

    public listarInmueble_porID(id: any): Observable<any> {
        this.apiGet_InmuexID = 'https://localhost:7141/inmueble/listarInmueblexID'
        this.apiGet_InmuexID = `${this.apiGet_InmuexID}?id_inmueble=${id}`
        return this.http.get(this.apiGet_InmuexID);
    }

    public listar_tipoInmueble(): Observable<any> {
        return this.http.get<tipo_inmueble>(this.apiListTipoInmueble)
    }
    public listarCiudad(): Observable<any> {
        return this.http.get<ciudad>(this.apiListCiudad)
    }
    public listarMoneda(): Observable<any> {
        return this.http.get<moneda>(this.apiListMoneda)
    }
    public listarMotivos(): Observable<any> {
        return this.http.get<tipoMotivo>(this.apiListMotivos)
    }
    public updateInmueble(inmue: inmueble): Observable<inmueble> {
        return this.http.put<inmueble>(this.apiUpdateInmueble, inmue);
    }
    public updateEstadoInmue(inmue : inmueble):Observable<inmueble>{
        return this.http.put<inmueble>(this.apiUpdateEstadoInmue,inmue);
    }
    public listarVentas_Top8(): Observable<any>{
        return this.http.get<inmueble>(this.apiListarInmueble_VentasTop8)
    }

}