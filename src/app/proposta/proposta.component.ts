import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Proposta } from '../models/proposta';
import { PropostaService } from '../services/proposta.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.component.html',
  styleUrls: ['./proposta.component.css']
})

export class PropostaComponent implements OnInit {

  proposta = {} as Proposta;
  propostas: Proposta[] | any = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild('content', {static: false}) el!: ElementRef;


  constructor(private propostaService: PropostaService) { }

  ngOnInit(): void {
    this.getPropostas();
  }

  getPropostas(): any {
    this.propostaService.getPropostas().subscribe((propostas: Proposta[]) => {
      this.propostas = propostas;
    });
  }

  
  printPDF() {
    let pdf = new jsPDF('p', 'pt', 'a4');
    pdf.html(this.el.nativeElement, {
      callback: (pdf) => {
        pdf.save('proposta.pdf')
      }
    })
  }

  openModal(content: any) {
    
  }

}
