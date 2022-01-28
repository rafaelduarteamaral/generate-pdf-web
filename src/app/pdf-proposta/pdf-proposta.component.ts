import { ElementRef, ViewChild, Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

import { jsPDF } from 'jspdf'
import { Proposta } from '../models/proposta';

@Component({
  selector: 'app-pdf-proposta',
  templateUrl: './pdf-proposta.component.html',
  styleUrls: ['./pdf-proposta.component.css']
})
export class PdfPropostaComponent implements OnInit {

  @ViewChild('content', {static: false}) el!: ElementRef;
  imgProposta = '../assets/proposta/proposta.jpg'
  constructor(  @Inject(MAT_DIALOG_DATA) public data: Proposta  ) { }

  ngOnInit(): void {

  }

  printPDF() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('proposta.pdf')
      }
    })
  }
}
