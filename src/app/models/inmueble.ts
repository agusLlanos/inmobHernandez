export class inmueble {
    id_inmueble: number
    fecha_ingreso: Date
    fechaIngreso_muestra: string
    tipo_inmueble: string
    motivo: string
    ciudad: string
    calle: string
    numero: number
    antiguedad: string
    estado: string
    medidas_lote: string
    observaciones: string
    propietario: string
    direccion ?: string

    id_tipoInmueble: number
    id_motivo: number
    id_ciudad : number    
    patio: boolean
    cochera: boolean
    balcon: boolean
    terraza: boolean
    comedor: boolean
    cocina: boolean
    pileta: boolean
    lavadero: boolean
    living: boolean
    ascensor: boolean
    aire_acond: boolean
    amoblado: boolean
    agua: boolean
    gas: boolean
    calefaccion: boolean
    luz: boolean
    cant_banios: number
    cant_habit: number
    nombre: string
    apellido: string
    dni: number
    telefono: string
    fecha_nac : Date
    email : string
    id_propietario : number
    cloaca : boolean
    costo_inicial : string
   

    constructor(inmue: any) {
        this.id_inmueble = inmue.id_inmueble
        this.id_propietario = inmue.id_propietario 
        this.fecha_ingreso = inmue.fecha_ingreso
        this.fechaIngreso_muestra = new Date(this.fecha_ingreso).toLocaleDateString()
        this.tipo_inmueble = this.convertirMayuscula(inmue.tipo)
        this.motivo = inmue.descripcion
        this.ciudad =  this.convertirMayuscula(inmue.ciudad)
        this.calle =  this.convertirMayuscula(inmue.calle)
        this.numero = inmue.numero
        this.direccion = ` ${this.convertirMayuscula(inmue.calle)} ${inmue.numero} `
        this.antiguedad = inmue.antiguedad
        this.estado = inmue.estado
        this.medidas_lote = inmue.medidas_lote
        this.observaciones = inmue.observaciones
        this.nombre = inmue.nombre
        this.apellido = inmue.apellido
        this.dni = inmue.dni
        this.telefono = inmue.telefono
        this.fecha_nac = inmue.fecha_nac
        this.email = inmue.email
        this.propietario = `${inmue.nombre} ${inmue.apellido}`
        this.id_tipoInmueble = inmue.id_tipoInmueble
        this.id_motivo = inmue.id_motivo
        this.id_ciudad = inmue.id_ciudad
        this.cloaca = inmue.cloaca
        this.patio = inmue.patio
        this.cochera = inmue.cochera
        this.balcon = inmue.balcon
        this.terraza = inmue.terraza
        this.comedor = inmue.comedor
        this.cocina = inmue.cocina
        this.pileta = inmue.pileta
        this.lavadero = inmue.lavadero
        this.living = inmue.living
        this.ascensor = inmue.ascensor
        this.aire_acond = inmue.aire_acond
        this.amoblado = inmue.amoblado
        this.agua = inmue.agua
        this.gas = inmue.gas
        this.calefaccion = inmue.calefaccion
        this.luz = inmue.luz
        this.cant_banios = inmue.cant_banios
        this.cant_habit = inmue.cant_habit
        this.costo_inicial = inmue.costo_inicial
    }
   
    variable : string = '';
    convertirMayuscula(str:string){    
        if(str != null){
          this.variable = str.charAt(0).toUpperCase() + str.slice(1); 
        }   
        return this.variable;
    }

}