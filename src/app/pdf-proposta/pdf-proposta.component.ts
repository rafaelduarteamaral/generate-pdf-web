import { ElementRef, ViewChild, Component, OnInit } from '@angular/core';
import { jsPDF } from 'jspdf'

@Component({
  selector: 'app-pdf-proposta',
  templateUrl: './pdf-proposta.component.html',
  styleUrls: ['./pdf-proposta.component.css']
})
export class PdfPropostaComponent implements OnInit {

  @ViewChild('content', {static: false}) el!: ElementRef;

  constructor() { }

  ngOnInit(): void {
  }

  printPDF() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {

      }
    })
  }

}
