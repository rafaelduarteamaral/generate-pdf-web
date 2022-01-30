import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Usuario } from './models/usuario';
import { PdfPropostaComponent } from './pdf-proposta/pdf-proposta.component';
import { PropostaFormularioComponent } from './proposta-formulario/proposta-formulario.component';
import { PropostaComponent } from './proposta/proposta.component';


var usuario: Usuario | any = localStorage.getItem('user_logged');
    usuario = JSON.parse(usuario)
var path;
if(usuario) {
  path = [
    { path: 'propostas', component: PropostaComponent },
    { path: 'formularioProposta', component: PropostaFormularioComponent },
    { path: 'formularioProposta/:id', component: PropostaFormularioComponent },
    { path: 'pdfProposta', component: PdfPropostaComponent }
  ];
} else {
  path = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },    
  ];
}


const routes: Routes = path;

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
