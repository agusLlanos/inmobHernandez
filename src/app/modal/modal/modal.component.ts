import { Component, Input } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent {
  constructor( private modalService: NgbModal) { }

  @Input() title = '';
  public show = false;

  showModal(){
    this.show = true;
  }
  hideModal(){
    this.show = false
  }
}
