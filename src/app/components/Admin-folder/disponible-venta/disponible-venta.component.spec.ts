import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibleVentaComponent } from './disponible-venta.component';

describe('DisponibleVentaComponent', () => {
  let component: DisponibleVentaComponent;
  let fixture: ComponentFixture<DisponibleVentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisponibleVentaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisponibleVentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
