import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Proposta } from '../models/proposta';

@Injectable({
  providedIn: 'root'
})
export class PropostaService {

  constructor(private httpClient: HttpClient) { }

  // Headers
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  }

  url = environment.apiUrl+'/propostas';

  getPropostas(): Observable<Proposta[]> {
    return this.httpClient.get<Proposta[]>(this.url)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }

  getPropostaId(id: any): Observable<Proposta[]> {
    return this.httpClient.get<Proposta[]>(this.url + '/' + id)
      .pipe(
        retry(2),
        catchError(this.handleError))
  }


  saveProposta(car: Proposta): Observable<Proposta> {
    return this.httpClient.post<Proposta>(this.url, JSON.stringify(car), this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      )
  }

  updateProposta(car: Proposta): Observable<Proposta> {
    return this.httpClient.put<Proposta>(this.url + '/' + car.id, JSON.stringify(car), this.httpOptions)
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
