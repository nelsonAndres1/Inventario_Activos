import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReporteGeneralPDFComponent } from './reporte-general-pdf.component';

describe('ReporteGeneralPDFComponent', () => {
  let component: ReporteGeneralPDFComponent;
  let fixture: ComponentFixture<ReporteGeneralPDFComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReporteGeneralPDFComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReporteGeneralPDFComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
