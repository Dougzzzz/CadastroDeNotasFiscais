import { Component, Output, signal, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { NotasFiscaisService } from '../../services/notas-fiscais.service';
import { FiltroNotaFiscal } from '../../models/filtroNotaFiscal.model';

@Component({
  selector: 'app-barra-de-filtros',
  templateUrl: './barra-de-filtros.component.html',
  styleUrls: ['./barra-de-filtros.component.css'],
  standalone: true,
  imports: [
    CommonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    ReactiveFormsModule,
  ]
})
export class BarraDeFiltrosComponent {
  panelOpenState = signal(false);
  filtroForm: FormGroup;
  @Output() filtrar = new EventEmitter<FiltroNotaFiscal>();
  @Output() limpar = new EventEmitter<void>()

  constructor(private fb: FormBuilder, private NotasFiscaisService: NotasFiscaisService) {
    this.filtroForm = this.fb.group({
      numeroNota: [''],
      dataEmissao: [''],
      nomeFornecedor: [''],
      nomeCliente: ['']
    });
  }

  togglePanel() {
    this.panelOpenState.update(state => !state);
  }

  aplicarFiltros() {
    const filtroValores: FiltroNotaFiscal = this.filtroForm.value;
    const filtroAtivo : Partial<FiltroNotaFiscal> = {};
    
    if (filtroValores.numeroNota) filtroAtivo.numeroNota = Number(filtroValores.numeroNota);
    if (filtroValores.dataEmissao) filtroAtivo.dataEmissao = filtroValores.dataEmissao;
    if (filtroValores.nomeFornecedor) filtroAtivo.nomeFornecedor = filtroValores.nomeFornecedor;
    if (filtroValores.nomeCliente) filtroAtivo.nomeCliente = filtroValores.nomeCliente;
    
    this.filtrar.emit(filtroAtivo);
  }

  limparFiltros() {
    this.filtroForm.reset({
      numeroNota: '',
      dataEmissao: '',
      nomeFornecedor: '',
      nomeCliente: ''
    });
    this.limpar.emit();
  }
}