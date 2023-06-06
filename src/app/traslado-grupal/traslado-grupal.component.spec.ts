import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrasladoGrupalComponent } from './traslado-grupal.component';

describe('TrasladoGrupalComponent', () => {
  let component: TrasladoGrupalComponent;
  let fixture: ComponentFixture<TrasladoGrupalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrasladoGrupalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TrasladoGrupalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
