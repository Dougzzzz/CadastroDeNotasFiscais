import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { NotaFiscal } from '../../models/notaFiscal.model';
import { NotasFiscaisService } from '../../services/notas-fiscais.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-lista-de-notas',
  standalone: true,
  templateUrl: './lista-de-notas.component.html',
  styleUrl: './lista-de-notas.component.css',
  imports: [MatTableModule]
})

export class ListaDeNotasComponent {
  notasFiscais$!: Observable<NotaFiscal[]>; 
  displayedColumns: string[] = ['demo-numero', 'demo-dataEmissao', 'demo-valor', 'demo-fornecedorNome', 'demo-fornecedorCNPJ', 'demo-clienteNome', 'demo-clienteCPF'];
  
  constructor(private notasFiscaisService: NotasFiscaisService) {}  
  
  ngOnInit() {
    this.obterNotasFiscais();
  } 

  obterNotasFiscais() {
    this.notasFiscais$ = this.notasFiscaisService.obterNotasFiscais();
  }
  
}
