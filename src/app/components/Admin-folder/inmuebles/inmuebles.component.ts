import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { inmueble } from 'src/app/models/inmueble';

@Component({
  selector: 'app-inmuebles',
  templateUrl: './inmuebles.component.html',
  styleUrls: ['./inmuebles.component.css']
})
export class InmueblesComponent implements OnInit {
  constructor(private ApiService: ApiService) { }
  inmuebles : inmueble[] = [];
  ngOnInit(): void {    
    this.llenarData()
  }
  llenarData() {
    this.ApiService.listarInmueble().subscribe(data => {
      data.inmueble.forEach((inmue: any) => {
        this.inmuebles.push(new inmueble(inmue))        
      })
    })
  }
}
