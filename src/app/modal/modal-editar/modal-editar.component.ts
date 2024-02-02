import { Component, Input, OnInit, TemplateRef } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
Input
@Component({
  selector: 'app-modal-editar',
  templateUrl: './modal-editar.component.html',
  styleUrls: ['./modal-editar.component.css']
})
export class ModalEditarComponent implements OnInit{
  @Input() public datos:any;

  ngOnInit(): void {
      console.log(this.datos)
  }
  constructor( public modal: NgbModal) {
    
  }

   
}
