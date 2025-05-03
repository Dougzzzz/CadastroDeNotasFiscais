import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { NotaFiscal } from '../models/notaFiscal.model';

@Injectable({
  providedIn: 'root'
})
export class NotasFiscaisService {
  private url = 'https://localhost:7004/api/NotasFiscais';
  constructor(private httpClient: HttpClient) { 
    
  }

  obterNotasFiscais() {
    return this.httpClient.get<NotaFiscal[]>(this.url);
  }
}
