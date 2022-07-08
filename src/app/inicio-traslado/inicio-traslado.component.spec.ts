import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioTrasladoComponent } from './inicio-traslado.component';

describe('InicioTrasladoComponent', () => {
  let component: InicioTrasladoComponent;
  let fixture: ComponentFixture<InicioTrasladoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioTrasladoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioTrasladoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
