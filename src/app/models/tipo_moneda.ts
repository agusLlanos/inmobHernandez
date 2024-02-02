export class moneda{
    id_moneda : number
    descripcion : string
    desc_corta : string
    signo : string

    constructor(mon : any){
        this.id_moneda = mon.id_moneda
        this.descripcion = mon.descripcion
        this.desc_corta = this.sacarEspacio(mon.desc_corta)
        this.signo = this.sacarEspacio(mon.signo)
    }

variable : any = '';

    sacarEspacio(str:string){
        if(str!=null){
            this.variable = str.trim();
        }
        return this.variable;
    }

}