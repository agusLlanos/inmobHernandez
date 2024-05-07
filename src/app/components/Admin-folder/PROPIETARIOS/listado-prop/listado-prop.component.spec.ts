import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListadoPropComponent } from './listado-prop.component';

describe('ListadoPropComponent', () => {
  let component: ListadoPropComponent;
  let fixture: ComponentFixture<ListadoPropComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListadoPropComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListadoPropComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
