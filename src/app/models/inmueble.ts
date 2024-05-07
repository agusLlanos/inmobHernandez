import { imagen_inmueble } from "./imagen_inmueble"

export class inmueble {
    id_inmueble: number
    fecha_ingreso: Date
    fechaIngreso_muestra: any
    fechaIngreso_date: any
    tipo_inmueble: string
    motivo: string
    ciudad: string
    calle: string
    numero: number
    antiguedad: string
    estado: any
    id_estado : boolean
    medidas_lote: string
    observaciones: string
    propietario: string
    direccion: string

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
    fechaNac_date: any
    email: string
    id_propietario: number
    cloaca: boolean
    costo_inicial: number
    signo: string
    desc_moneda: string
    id_moneda: number
   imagen: imagen_inmueble
    primer_imagen: string
    colorEstado: string
    ruta : string
    nombreArchivo : string

    constructor(inmue: any) {
        this.id_inmueble = inmue.id_inmueble || null
        this.id_propietario = inmue.id_propietario || null
        this.fecha_ingreso = inmue.fecha_ingreso || null
        this.fechaIngreso_muestra = (this.fecha_ingreso != null) ? new Date(this.fecha_ingreso).toLocaleDateString() : null
        this.fechaIngreso_date = (this.fecha_ingreso != null) ? new Date(this.fecha_ingreso).toISOString().split('T')[0] : undefined
        this.tipo_inmueble = inmue.tipo || null
        this.motivo = this.sacarEspacio(inmue.descripcion)
        this.ciudad = this.convertirMayuscula(inmue.ciudad)
        this.calle = this.convertirMayuscula(inmue.calle)
        this.numero = inmue.numero || null
        this.direccion = ` ${this.convertirMayuscula(inmue.calle)} ${inmue.numero} ` || ''
        this.antiguedad = inmue.antiguedad || null
        this.estado = this.sacarEspacio(inmue.estado) || ''
        this.id_estado = (this.estado == 'alta') ? inmue.id_estado = true : inmue.id_estado = false
        this.medidas_lote = inmue.medidas_lote || null
        this.observaciones = inmue.observaciones || ''
        this.nombre = inmue.nombre || null
        this.apellido = inmue.apellido || null
        this.dni = inmue.dni || null
        this.telefono = inmue.telefono || null
        this.fecha_nac = inmue.fecha_nac || null
        this.fechaNacMuestra = (this.fecha_nac != null) ? new Date(this.fecha_nac).toLocaleDateString() : undefined
        this.fechaNac_date = (this.fecha_nac != null) ? new Date(this.fecha_nac).toISOString().split('T')[0] : undefined
        this.email = inmue.email || null
        this.propietario = `${inmue.nombre} ${inmue.apellido}` || ''
        this.id_tipoInmueble = inmue.id_tipoInmueble || null
        this.id_motivo = inmue.id_motivo || null
        this.id_ciudad = inmue.id_ciudad || null
        this.cloaca = inmue.cloaca || false
        this.patio = inmue.patio || false
        this.cochera = inmue.cochera || false
        this.balcon = inmue.balcon || false
        this.terraza = inmue.terraza || false
        this.comedor = inmue.comedor || false
        this.cocina = inmue.cocina || false
        this.pileta = inmue.pileta || false
        this.lavadero = inmue.lavadero || false
        this.living = inmue.living || false
        this.ascensor = inmue.ascensor || false
        this.aire_acond = inmue.aire_acond || false
        this.amoblado = inmue.amoblado || false
        this.agua = inmue.agua || false
        this.gas = inmue.gas || false
        this.calefaccion = inmue.calefaccion || false
        this.luz = inmue.luz || false
        this.cant_banios = inmue.cant_banios || 0
        this.cant_habit = inmue.cant_habit || 0
        this.costo_inicial = inmue.costo_inicial || null
        this.signo = this.sacarEspacio(inmue.signo) || ''
        this.desc_moneda = this.sacarEspacio(inmue.moneda) || ''
        this.id_moneda = inmue.id_moneda || null
        this.imagen = inmue.imagen || null
        this.colorEstado = inmue.colorEstado || ''
        this.ruta = inmue.ruta || ''
        this.nombreArchivo = this.convertirNombreArchivo(this.ruta) || null
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
    name : any = null;

    fecha(fecha: Date) {
        this.splitted = 'ISO';
        this.options = {
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',

        };
    }

    convertirNombreArchivo(ruta : string){
        var separador : string = "\\";
         var array : string [];  
 
         if(ruta != null){
             array = ruta.split(separador);  
             this.name = array.at(-1) 
         }
         return this.name;
     }

}