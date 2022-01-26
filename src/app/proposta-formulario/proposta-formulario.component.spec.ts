import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropostaFormularioComponent } from './proposta-formulario.component';

describe('PropostaFormularioComponent', () => {
  let component: PropostaFormularioComponent;
  let fixture: ComponentFixture<PropostaFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropostaFormularioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropostaFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
