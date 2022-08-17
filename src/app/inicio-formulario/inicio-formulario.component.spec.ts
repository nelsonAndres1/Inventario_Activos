import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InicioFormularioComponent } from './inicio-formulario.component';

describe('InicioFormularioComponent', () => {
  let component: InicioFormularioComponent;
  let fixture: ComponentFixture<InicioFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InicioFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InicioFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
