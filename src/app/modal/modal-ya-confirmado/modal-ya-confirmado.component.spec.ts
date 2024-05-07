import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalYaConfirmadoComponent } from './modal-ya-confirmado.component';

describe('ModalYaConfirmadoComponent', () => {
  let component: ModalYaConfirmadoComponent;
  let fixture: ComponentFixture<ModalYaConfirmadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalYaConfirmadoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalYaConfirmadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
