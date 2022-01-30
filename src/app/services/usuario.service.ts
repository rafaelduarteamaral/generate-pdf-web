import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from './../../environments/environment';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  

  url = environment.apiUrl; // api rest fake

  // injetando o HttpClient
  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }


  saveUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.post<Usuario>(this.url, JSON.stringify(usuario), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  loginUsuario(usuario: Usuario): Observable<Usuario> {
    console.log(environment.apiUrl)
    return this.httpClient.post<Usuario>(`${this.url}/login`, JSON.stringify(usuario), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  // utualiza um usuario
  updateUsuario(usuario: Usuario): Observable<Usuario> {
    return this.httpClient.put<Usuario>(this.url + '/' + usuario.id, JSON.stringify(usuario), this.httpOptions)
      .pipe(
        retry(1),
        catchError(this.handleError)
      )
  }

    // Manipulação de erros
    handleError(error: HttpErrorResponse) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Erro ocorreu no lado do client
        errorMessage = error.error.message;
      } else {
        // Erro ocorreu no lado do servidor
        errorMessage = `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
    };

}
