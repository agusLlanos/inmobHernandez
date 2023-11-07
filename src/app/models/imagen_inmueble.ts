export class imagen_inmueble{
    id_inmueble : number
    descripcion : string
    Archivo : any
    ruta : string

    constructor(imag : any){
        this.id_inmueble = imag.id_inmueble
        this.descripcion = imag.descripcion
        this.Archivo = imag.Archivo
        this.ruta = imag.ruta
    }

}