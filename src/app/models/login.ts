export class login{
    id:number
    usuario : string
    password : string
    apenom : string
    activo : boolean

    constructor(user : any){
     this.id = user.id
     this.usuario = user.usuario
     this.password = user.contraseña
     this.apenom = user.apenom
     this.activo = user.activo 
    }
}