import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatTableModule} from '@angular/material/table';
import { NotaFiscal } from '../../models/notaFiscal.model';
import { NotasFiscaisService } from '../../services/notas-fiscais.service';
import { Observable } from 'rxjs';
import { FiltroNotaFiscal } from '../../models/filtroNotaFiscal.model';

@Component({
  selector: 'app-lista-de-notas',
  standalone: true,
  templateUrl: './lista-de-notas.component.html',
  styleUrl: './lista-de-notas.component.css',
  imports: [MatTableModule, CommonModule]
})

export class ListaDeNotasComponent {
  notasFiscais$!: Observable<NotaFiscal[]>; 
  displayedColumns: string[] = ['demo-numero', 'demo-dataEmissao', 'demo-valor', 'demo-fornecedorNome', 'demo-fornecedorCNPJ', 'demo-clienteNome', 'demo-clienteCPF'];
  
  constructor(private notasFiscaisService: NotasFiscaisService) {}  
  
  ngOnInit() {
    this.obterNotasFiscais();
  } 

  obterNotasFiscais(filtro?: FiltroNotaFiscal): void {
    this.notasFiscais$ = this.notasFiscaisService.obterNotasFiscais(filtro);
  }

  public aplicarFiltroNaLista(filtro: FiltroNotaFiscal): void {
    this.obterNotasFiscais(filtro);
  }

  public limparFiltroNaLista(): void {
    this.obterNotasFiscais(); // Chama sem filtro para obter todas as notas
  }
}
