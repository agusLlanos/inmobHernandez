import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargaImagenesComponent } from './carga-imagenes.component';

describe('CargaImagenesComponent', () => {
  let component: CargaImagenesComponent;
  let fixture: ComponentFixture<CargaImagenesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CargaImagenesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CargaImagenesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
