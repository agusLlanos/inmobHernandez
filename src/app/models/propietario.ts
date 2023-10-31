export class propietario{
    nombre: string
    apellido: string
    dni: number
    telefono: string
    fecha_nac : Date
    email : string
    id_propietario : number
    apeNom : string

    constructor(prop : any){
    this.nombre = prop.nombre
    this.apellido = prop.apellido
    this.dni = prop.dni
    this.telefono = prop.telefono
    this.fecha_nac = prop.fecha_nac
    this.email = prop.email
    this.id_propietario = prop.id_propietario
    this.apeNom = ` ${prop.nombre} ${prop.apellido}`

    }
}