export class ciudad {
    id_ciudad : number
    descripcion : string
    id_prov : number

    constructor(ciudad : any){
        this.id_ciudad = ciudad.id_ciudad
        this.descripcion = ciudad.descripcion
        this.id_prov = ciudad.id_prov
    }
}