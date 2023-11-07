import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibleAlquilerComponent } from './disponible-alquiler.component';

describe('DisponibleAlquilerComponent', () => {
  let component: DisponibleAlquilerComponent;
  let fixture: ComponentFixture<DisponibleAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisponibleAlquilerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisponibleAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
