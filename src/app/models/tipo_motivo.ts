export class tipoMotivo{
    id_motivo : number
    motivo : string

constructor(mot : any){
    this.id_motivo = mot.id_motivo
    this.motivo = mot.motivo
}
}