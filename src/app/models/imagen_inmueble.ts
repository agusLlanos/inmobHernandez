export class imagen_inmueble{
    id_inmueble : number
    descripcion : string
    Archivo : any[]
    ruta : string
    nombreArchivo : any

    constructor(imag : any){
        this.id_inmueble = imag.id_inmueble
        this.descripcion = imag.descripcion
        this.Archivo = imag.Archivo
        this.ruta = imag.ruta
        this.nombreArchivo = this.convertirNombreArchivo(imag.ruta)
    }       

    convertirNombreArchivo(ruta : string){
       var separador : string = "\\";
        var array : string [];  

        if(ruta != null){
            array = ruta.split(separador);  
            var variable = array.at(-1) 
        }
        return variable;
    }

}