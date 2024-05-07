export class propietario{
    nombre: string
    apellido: string
    dni: number
    telefono: string
    fecha_nac : Date
    email : string
    id_propietario : number
    apeNom : string
    fechaNac_muestra : any
    fechaNac_date : any
    cantidad : any

    constructor(prop : any){
    this.nombre = prop.nombre
    this.apellido = prop.apellido || ''
    this.dni = prop.dni
    this.telefono = prop.telefono
    this.fecha_nac = prop.fecha_nac
    this.email = prop.email
    this.id_propietario = prop.id_propietario || null
    this.apeNom = `${this.convertirMayuscula(prop.apellido)} ${prop.nombre}` || ''
    this.fechaNac_muestra = (this.fecha_nac != null) ? new Date(this.fecha_nac).toLocaleDateString() : undefined
    this.fechaNac_date = (this.fecha_nac != null) ? new Date(this.fecha_nac).toISOString().split('T')[0] : undefined
    this.cantidad = prop.cantidad
    }

    variable: string = '';
    convertirMayuscula(str: string) {
        if (str != null) {
            this.variable = str.charAt(0).toUpperCase() + str.slice(1);
        }
        return this.variable;
    }
    
}