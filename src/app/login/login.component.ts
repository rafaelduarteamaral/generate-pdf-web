import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Usuario } from '../models/usuario';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  router: Router;

  constructor(private usuarioService: UsuarioService, router: Router){ this.router = router;}
  

  ngOnInit(): void {
  }


  usuario = {} as Usuario;
  usuarios: Usuario[] | undefined;

  // defini se um carro será criado ou atualizado
  saveUsuario(form: NgForm) {
    if (this.usuario.id !== undefined) {
      this.usuarioService.updateUsuario(this.usuario).subscribe(() => {
        this.cleanForm(form);
      });
    } else {
      this.usuarioService.saveUsuario(this.usuario).subscribe(() => {
        this.cleanForm(form);
      });
    }
  }

  loginUsuario(form: NgForm) {
    this.usuarioService.loginUsuario(this.usuario).subscribe((usuario) => {
      this.cleanForm(form);
      Swal.fire({
        title: 'Sucesso!',
        text: 'Usuário logado com sucesso!',
        icon: 'success',
        confirmButtonText: 'Cool'
      }) 
      localStorage.setItem('user_logged', JSON.stringify(usuario));
      this.router.navigate(['/proposta']);
    },
    (err) => {
      Swal.fire({
        title: 'Error!',
        text: 'Email ou senha invalido!',
        icon: 'error',
        confirmButtonText: 'Cool'
      }) 
    });
  }
  

  cleanForm(form: NgForm) {
    form.resetForm();
    this.usuario = {} as Usuario;
  }
}
