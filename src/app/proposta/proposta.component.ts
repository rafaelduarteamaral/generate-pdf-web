import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Proposta } from '../models/proposta';
import { PropostaService } from '../services/proposta.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import jsPDF from 'jspdf';
import {MatDialog} from '@angular/material/dialog';
import { PdfPropostaComponent } from '../pdf-proposta/pdf-proposta.component';

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

  constructor(private propostaService: PropostaService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.getPropostas();
  }

  getPropostas(): any {
    this.propostaService.getPropostas().subscribe((propostas: Proposta[]) => {
      this.propostas = propostas;
    });
  }

  

  openDialog(propostaItem: Proposta) {
    const dialogRef = this.dialog.open(PdfPropostaComponent, {
      height: '80vh',
      data: propostaItem
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
