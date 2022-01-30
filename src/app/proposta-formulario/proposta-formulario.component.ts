import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Proposta } from '../models/proposta';
import { PropostaService } from '../services/proposta.service';
import Swal from 'sweetalert2';
import { Usuario } from '../models/usuario';


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

  constructor(private propostaService: PropostaService) { }

  ngOnInit(): void {
    
    this.usuario = localStorage.getItem('user_logged');
    this.usuario = JSON.parse(this.usuario)
    this.proposta.idUsuario =this.usuario.id;



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

    // defini se um carro será criado ou atualizado
    saveProposta(form: NgForm) {

      if (this.proposta.id !== undefined) {
        this.propostaService.updateProposta(this.proposta).subscribe(() => {
          this.cleanForm(form);
          Swal.fire({
            title: 'Sucesso!',
            text: 'Proposta gerada!',
            icon: 'success',
            confirmButtonText: 'Cool'
          }) 
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
