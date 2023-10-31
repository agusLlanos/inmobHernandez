import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { usuario } from '../models/usuario';
import { inmueble } from '../models/inmueble';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApiGet = 'https://localhost:7141/usuario/listar';
  private urlApiPost = 'https://localhost:7141/usuario/agregar';
  private urlApiPut = 'https://localhost:7141/usuario/modificar';
  private urlApiDelete = 'https://localhost:7141/usuario/eliminar';
  private urlApiLogin = 'https://localhost:7141/usuario/listarUser';
  private urlApiLoginxID = 'https://localhost:7141/usuario/listarUserxID';
   
  constructor(private http: HttpClient) { }

  public getData(): Observable<any>{
    return this.http.get<usuario>(this.urlApiGet)
  }

  createUser(user: usuario): Observable<usuario>{
    return this.http.post<any>(this.urlApiPost, user); 
  }

  updateUser(user:usuario):Observable<usuario>{
    return this.http.put<usuario>(this.urlApiPut, user);
  }

  deleteUser(id:any):Observable<any>{
    this.urlApiDelete = `${this.urlApiDelete}?idUsuario=${id}`
    return this.http.delete(this.urlApiDelete);
  }
  loginUser():Observable<any>{    
    return this.http.get<any>(this.urlApiLogin);
  }
  loginUserxID(id:any):Observable<any>{
    this.urlApiLoginxID = `${this.urlApiLoginxID}?id=${id}`
    return this.http.get(this.urlApiLoginxID);
  }

 private urlApiGetListar = 'https://localhost:7141/inmueble/listar';

  public listarInmueble(): Observable<any>{
    return this.http.get<inmueble>(this.urlApiGetListar)
  } 
}
