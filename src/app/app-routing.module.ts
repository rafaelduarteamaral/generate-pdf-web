import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PropostaFormularioComponent } from './proposta-formulario/proposta-formulario.component';
import { PropostaComponent } from './proposta/proposta.component';



const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'proposta', component: PropostaComponent },
  { path: 'formularioProposta', component: PropostaFormularioComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
