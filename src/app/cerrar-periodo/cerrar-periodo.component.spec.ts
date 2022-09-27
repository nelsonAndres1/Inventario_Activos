import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarPeriodoComponent } from './cerrar-periodo.component';

describe('CerrarPeriodoComponent', () => {
  let component: CerrarPeriodoComponent;
  let fixture: ComponentFixture<CerrarPeriodoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CerrarPeriodoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CerrarPeriodoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
