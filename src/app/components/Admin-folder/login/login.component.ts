import { Component } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { login } from 'src/app/models/login';
import { Router } from '@angular/router';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private ApiService: ApiService, private Router: Router) { }
  usuarios: login[] = [];
  validacion: boolean = false;
  model: login = new login({ usuario: '', password: '' })
  found: any;
  mensaje: string ;

  ngOnInit(): void {
    
  }

  llenarData() {
    this.ApiService.loginUser().subscribe(data => {
      data.usuario.forEach((usu: any) => {
        this.usuarios.push(new login(usu))
      })
    })
  }

  enviar() {
    this.llenarData()
    this.validacion = false;

    if (this.model.usuario != '') {
      this.validacion = false;
      if (this.model.password != null) {
        this.validacion = false;
        this.found = this.usuarios.find((us) => us.usuario.trim() == this.model.usuario && us.password.trim() == this.model.password);

        if (this.found) {
          this.Router.navigate(['/Admin'])
        } else {
          this.validacion = true;
          this.mensaje = 'Usuario o contraseña incorrecta'
        }
      } else {
        this.validacion = true;
        this.mensaje = 'Debe ingresar contraseña'
      }
    }
    else {
      this.validacion = true;
      this.mensaje = 'Debe ingresar Usuario'
    }





   

  }
  
}



