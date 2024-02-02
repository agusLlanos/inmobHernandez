export class tipo_inmueble{
    id_tipoInmueble : number
    descripcion : string

    constructor(tipo:any){
        this.id_tipoInmueble = tipo.id_tipoInmueble
        this.descripcion = tipo.descripcion
    }
}