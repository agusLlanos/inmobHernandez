export class usuario {
    id: number
    nombre: string
    apellido: string
    dni: number
    telefono: string
    email: string
    descripcion: string
    fecha_nac: Date
    tipo_usuario : number
    fechaNac_muestra : string

    //apenom:string
    //notas:number []
    // promedio:number

    constructor(usua: any) {
        this.id = usua.id
        this.nombre = usua.nombre
        this.apellido = usua.apellido
        this.dni = usua.dni
        this.email = usua.email
        this.telefono = usua.telefono
        this.descripcion = usua.descripcion
        this.fecha_nac = usua.fecha_nac
        this.tipo_usuario = usua.tipo_usuario
        this.fechaNac_muestra = new Date(this.fecha_nac).toLocaleDateString()
        //this.apenom = usua.nombre + '' + usua.apellido.toUpperCase() (apellido mayuscula)
        //this.notas = usua.notas
        // this.promedio = usua.notas[0]

    }

    /* obtenerpro(){
        this.notas
        
        return this.notas
    } */

}