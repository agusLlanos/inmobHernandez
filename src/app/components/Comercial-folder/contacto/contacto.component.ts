import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { usuario } from 'src/app/models/usuario';

@Component({
  selector: 'app-contacto',
  templateUrl: './contacto.component.html',
  styleUrls: ['./contacto.component.css']
})

export class ContactoComponent implements OnInit {
  constructor(private ApiService:ApiService) {}

  ngOnInit(): void { 
  }

  model: usuario = new usuario({nombre:'', apellido:'', telefono:'', email:''})  

  onSubmit(){
    console.log(this.model);
    console.log('prueba')
    alert('prueba');

    this.ApiService.createUser(this.model).subscribe((Response : usuario) => console.log(Response));
  }


}
