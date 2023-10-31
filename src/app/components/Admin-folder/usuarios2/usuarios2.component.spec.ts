import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Usuarios2Component } from './usuarios2.component';

describe('Usuarios2Component', () => {
  let component: Usuarios2Component;
  let fixture: ComponentFixture<Usuarios2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Usuarios2Component ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Usuarios2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
