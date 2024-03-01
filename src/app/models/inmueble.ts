import { imagen_inmueble } from "./imagen_inmueble"

export class inmueble {
    id_inmueble: number
    fecha_ingreso: Date
    fechaIngreso_muestra: any
    fechaIngreso_date : any
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
    direccion?: string

    id_tipoInmueble: number
    id_motivo: number
    id_ciudad: number
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
    fecha_nac: Date
    fechaNacMuestra: any
    fechaNac_date : any
    email: string
    id_propietario: number
    cloaca: boolean
    costo_inicial: number
    signo: string
    desc_moneda: string    
    id_moneda: number    
    list_imagen : imagen_inmueble[] 
    primer_imagen : string
    constructor(inmue: any) {
        this.id_inmueble = inmue.id_inmueble || null
        this.id_propietario = inmue.id_propietario|| null 
        this.fecha_ingreso = inmue.fecha_ingreso|| null 
        this.fechaIngreso_muestra = (this.fecha_ingreso != null) ? new Date(this.fecha_ingreso).toLocaleDateString() : null
        this.fechaIngreso_date = (this.fecha_ingreso != null) ? new Date(this.fecha_ingreso).toISOString().split('T')[0] : undefined
        this.tipo_inmueble = inmue.tipo|| null
        this.motivo = this.sacarEspacio(inmue.descripcion)
        this.ciudad = this.convertirMayuscula(inmue.ciudad)
        this.calle = this.convertirMayuscula(inmue.calle)
        this.numero = inmue.numero|| null
        this.direccion = ` ${this.convertirMayuscula(inmue.calle)} ${inmue.numero} `
        this.antiguedad = inmue.antiguedad|| null
        this.estado = inmue.estado|| null
        this.medidas_lote = inmue.medidas_lote|| null
        this.observaciones = inmue.observaciones|| null
        this.nombre = inmue.nombre|| null
        this.apellido = inmue.apellido|| null
        this.dni = inmue.dni|| null
        this.telefono = inmue.telefono|| null
        this.fecha_nac = inmue.fecha_nac|| null       
        this.fechaNacMuestra = (this.fecha_nac != null) ? new Date(this.fecha_nac).toLocaleDateString() : undefined
        this.fechaNac_date = (this.fecha_nac != null) ? new Date(this.fecha_nac).toISOString().split('T')[0] : undefined
        this.email = inmue.email || null
        this.propietario = `${inmue.nombre} ${inmue.apellido}` || ''
        this.id_tipoInmueble = inmue.id_tipoInmueble || null
        this.id_motivo = inmue.id_motivo || null
        this.id_ciudad = inmue.id_ciudad || null
        this.cloaca = inmue.cloaca || null
        this.patio = inmue.patio || null
        this.cochera = inmue.cochera || null
        this.balcon = inmue.balcon || null
        this.terraza = inmue.terraza || null
        this.comedor = inmue.comedor || null
        this.cocina = inmue.cocina || null
        this.pileta = inmue.pileta || null
        this.lavadero = inmue.lavadero || null
        this.living = inmue.living || null
        this.ascensor = inmue.ascensor || null
        this.aire_acond = inmue.aire_acond || null
        this.amoblado = inmue.amoblado || null
        this.agua = inmue.agua || null
        this.gas = inmue.gas || null
        this.calefaccion = inmue.calefaccion || null
        this.luz = inmue.luz || null
        this.cant_banios = inmue.cant_banios || null
        this.cant_habit = inmue.cant_habit || null
        this.costo_inicial = inmue.costo_inicial || null
        this.signo = this.sacarEspacio(inmue.signo) || ''
        this.desc_moneda = this.sacarEspacio(inmue.moneda) || ''
        this.id_moneda = inmue.id_moneda || null
        this.list_imagen = []

    }

    variable: string = '';
    convertirMayuscula(str: string) {
        if (str != null) {
            this.variable = str.charAt(0).toUpperCase() + str.slice(1);
        }
        return this.variable;
    }

    sacarEspacio(str: string) {
        if (str != null) {
            this.variable = str.trim();
        }
        return this.variable;
    }

    splitted: any;
    fecha1: Date
    options: any;
    fecha(fecha: Date) {


        this.splitted = 'ISO';
        this.options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',

        };
    }

}