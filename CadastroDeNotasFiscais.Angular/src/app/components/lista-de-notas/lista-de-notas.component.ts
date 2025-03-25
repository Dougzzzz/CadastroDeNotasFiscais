import { Component } from '@angular/core';
import {MatTableModule} from '@angular/material/table';

@Component({
  selector: 'app-lista-de-notas',
  standalone: true,
  templateUrl: './lista-de-notas.component.html',
  styleUrl: './lista-de-notas.component.css',
  imports: [MatTableModule]
})
export class ListaDeNotasComponent {
  notasFiscais = [
    {
        "Id": "507f1f77bcf86cd799439011",
        "Numero": 12345,
        "DataEmissao": "2023-10-01",
        "Valor": 1500.75,
        "Fornecedor": {
            "Nome": "Fornecedor A",
            "Inscricao": "12.345.678/0001-99"
        },
        "Cliente": {
            "Nome": "Cliente X",
            "Inscricao": "123.456.789-00"
        }
    },
    {
        "Id": "507f1f77bcf86cd799439012",
        "Numero": 12346,
        "DataEmissao": "2023-10-02",
        "Valor": 2300.50,
        "Fornecedor": {
            "Nome": "Fornecedor B",
            "Inscricao": "98.765.432/0001-11"
        },
        "Cliente": {
            "Nome": "Cliente Y",
            "Inscricao": "987.654.321-00"
        }
    }
  ]; 
  displayedColumns: string[] = ['demo-numero', 'demo-dataEmissao', 'demo-valor', 'demo-fornecedorNome', 'demo-fornecedorCNPJ', 'demo-clienteNome', 'demo-clienteCPF'];
  dataSource = this.notasFiscais;
}
