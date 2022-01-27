import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Proposta } from '../models/proposta';
import { PropostaService } from '../services/proposta.service';

@Component({
  selector: 'app-proposta',
  templateUrl: './proposta.component.html',
  styleUrls: ['./proposta.component.css']
})
export class PropostaComponent implements OnInit {

  proposta = {} as Proposta;
  propostas: Proposta[] | undefined;

  constructor(private propostaService: PropostaService) { }

  ngOnInit(): void {
    this.getPropostas();
  }

  getPropostas() {
    this.propostaService.getPropostas().subscribe((propostas: Proposta[]) => {
      this.propostas = propostas;
    });
  }

}
