import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioReporteComponent } from './inicio-reporte.component';

describe('InicioReporteComponent', () => {
  let component: InicioReporteComponent;
  let fixture: ComponentFixture<InicioReporteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioReporteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioReporteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
