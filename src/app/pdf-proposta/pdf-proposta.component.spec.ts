import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PdfPropostaComponent } from './pdf-proposta.component';

describe('PdfPropostaComponent', () => {
  let component: PdfPropostaComponent;
  let fixture: ComponentFixture<PdfPropostaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PdfPropostaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PdfPropostaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
