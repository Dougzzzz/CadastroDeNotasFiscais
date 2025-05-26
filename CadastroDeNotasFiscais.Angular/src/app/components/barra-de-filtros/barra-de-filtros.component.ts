import { Component, signal } from '@angular/core';
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
    console.log('Filtros aplicados:', this.filtroForm.value);
    // Implemente a lógica de filtragem aqui
  }

  limparFiltros() {
    this.filtroForm.reset();
    // Implemente a lógica de limpeza aqui se necessário
  }
}