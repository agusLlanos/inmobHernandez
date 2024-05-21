export class imagen_inmueble{
    id_inmueble : number
    descripcion : string
    Archivo : any[]
    ruta : string
    nombreArchivo : any
    imagenPerfil : boolean
    posicion : number;

    constructor(imag : any){
        this.id_inmueble = imag.id_inmueble || null
        this.descripcion = imag.descripcion || null
        this.Archivo = imag.Archivo || null
        this.ruta = imag.ruta || null
        this.nombreArchivo = this.convertirNombreArchivo(imag.ruta) || null
        this.imagenPerfil = imag.imagenPerfil || null
        this.posicion = imag.posicion || null
    }       
     variable : any = null;
     
    convertirNombreArchivo(ruta : string){
       var separador : string = "\\";
        var array : string [];  

        if(ruta != null){
            array = ruta.split(separador);  
            this.variable = array.at(-1) 
        }
        return this.variable;
    }

}