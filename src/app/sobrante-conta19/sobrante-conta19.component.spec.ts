import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SobranteConta19Component } from './sobrante-conta19.component';

describe('SobranteConta19Component', () => {
  let component: SobranteConta19Component;
  let fixture: ComponentFixture<SobranteConta19Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SobranteConta19Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SobranteConta19Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
