import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NotaFiscal } from '../models/notaFiscal.model';
import { Observable } from 'rxjs';
import { FiltroNotaFiscal } from '../models/filtroNotaFiscal.model';

@Injectable({
  providedIn: 'root'
})
export class NotasFiscaisService {
  private url = 'https://localhost:7004/api/NotasFiscais';
  constructor(private httpClient: HttpClient) { 
    
  }

  obterNotasFiscais(filtro?: FiltroNotaFiscal): Observable<NotaFiscal[]> {
    let params = new HttpParams();
    if (filtro) {
      if (filtro.numeroNota) {
        params = params.set('NumeroDaNota', filtro.numeroNota);
      }
      if (filtro.dataEmissao) {
        params = params.set('DataEmissao', filtro.dataEmissao);
      }
      if (filtro.nomeFornecedor) {
        params = params.set('NomeDoFornecedor', filtro.nomeFornecedor);
      }
      if (filtro.nomeCliente) {
        params = params.set('NomeDoCliente', filtro.nomeCliente);
      }
    }
    return this.httpClient.get<NotaFiscal[]>(this.url, { params });
  }
}
