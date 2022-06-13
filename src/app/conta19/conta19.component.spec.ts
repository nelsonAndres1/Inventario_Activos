import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Conta19Component } from './conta19.component';

describe('Conta19Component', () => {
  let component: Conta19Component;
  let fixture: ComponentFixture<Conta19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Conta19Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Conta19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
