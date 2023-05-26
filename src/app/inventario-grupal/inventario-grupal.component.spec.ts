import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioGrupalComponent } from './inventario-grupal.component';

describe('InventarioGrupalComponent', () => {
  let component: InventarioGrupalComponent;
  let fixture: ComponentFixture<InventarioGrupalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InventarioGrupalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InventarioGrupalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
