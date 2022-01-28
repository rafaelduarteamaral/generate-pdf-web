import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from './models/usuario';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Destak';
  logado = false;
  usuario = {} as Usuario | any;
  router: Router;

  constructor(router: Router){ this.router = router;}

  ngOnInit(): void {

    
    this.usuario = localStorage.getItem('user_logged');

    if(this.usuario) {
      this.usuario = JSON.parse(this.usuario)
      if(this.usuario && !this.usuario.auth) {
        this.router.navigate(['/login']);
        this.logado = false;
      } else {
        this.logado = true;
      }
    }
  }

  logout() {
    this.usuario = localStorage.clear();
    this.router.navigate(['/login'])
  }
}
