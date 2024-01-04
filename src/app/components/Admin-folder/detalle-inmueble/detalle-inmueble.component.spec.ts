import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleInmuebleComponent } from './detalle-inmueble.component';

describe('DetalleInmuebleComponent', () => {
  let component: DetalleInmuebleComponent;
  let fixture: ComponentFixture<DetalleInmuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleInmuebleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
