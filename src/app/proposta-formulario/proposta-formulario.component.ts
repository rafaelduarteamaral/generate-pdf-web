import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proposta } from '../models/proposta';
import { PropostaService } from '../services/proposta.service';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-proposta-formulario',
  templateUrl: './proposta-formulario.component.html',
  styleUrls: ['./proposta-formulario.component.css']
})
export class PropostaFormularioComponent implements OnInit {
  public customPatterns = { '0': { pattern: new RegExp('\[a-zA-Z\]')} };

  proposta = {} as Proposta;
  propostas: Proposta[] | undefined;
  usuario = {} as Usuario | any;
  id: any;
  constructor(private propostaService: PropostaService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    
    this.usuario = localStorage.getItem('user_logged');
    this.usuario = JSON.parse(this.usuario)
    this.proposta.idUsuario =this.usuario.id;

    if(this.route.snapshot.paramMap.get('id')) {
      this.id = this.route.snapshot.paramMap.get('id');
      this.getProposta(this.id);
    }
    
    
    (function () { 
      'use strict'
    
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.querySelectorAll('.needs-validation')
    
      // Loop over them and prevent submission
      Array.prototype.slice.call(forms)
        .forEach(function (form) {
          form.addEventListener('submit', function (event: any) {
            if (!form.checkValidity()) {
              event.preventDefault()
              event.stopPropagation()
            }
    
            form.classList.add('was-validated')
          }, false)
        })
    })()

          
  }

  getProposta(id: any): void {
    this.propostaService.getPropostaId(id).subscribe((proposta: Proposta[]) => {
      this.proposta = proposta[0];
      console.log(proposta)
    });
  }

    // defini se um carro será criado ou atualizado
    saveProposta(form: NgForm) {

      if (this.id !== undefined) {
        this.propostaService.updateProposta(this.proposta).subscribe(() => {
          this.cleanForm(form);
          Swal.fire({
            title: 'Sucesso!',
            text: 'Proposta gerada!',
            icon: 'success',
            confirmButtonText: 'Cool'
          })
          this.getProposta(this.id);
        },
        (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'Erro ao gerar a proposta!',
            icon: 'error',
            confirmButtonText: 'Cool'
          }) 
        });
      } else {
        this.propostaService.saveProposta(this.proposta).subscribe(() => {
          this.cleanForm(form);
          Swal.fire({
            title: 'Sucesso!',
            text: 'Proposta gerada!',
            icon: 'success',
            confirmButtonText: 'Cool'
          }) 
          this.router.navigate([`/propostas`]);
        },
        (err) => {
          Swal.fire({
            title: 'Error!',
            text: 'Erro ao gerar a proposta!',
            icon: 'error',
            confirmButtonText: 'Cool'
          }) 
        });
      }
    }

    cleanForm(form: NgForm) {
      form.resetForm();
      this.proposta = {} as Proposta;
    }

}
