import { Component, ViewChild } from '@angular/core';
import { BarraDeFiltrosComponent } from '../../components/barra-de-filtros/barra-de-filtros.component';
import { ListaDeNotasComponent } from '../../components/lista-de-notas/lista-de-notas.component';
import { FiltroNotaFiscal } from '../../models/filtroNotaFiscal.model';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [BarraDeFiltrosComponent, ListaDeNotasComponent]
})
export class HomeComponent {
  @ViewChild(ListaDeNotasComponent) listaDeNotasComponent!: ListaDeNotasComponent;

    constructor() { }
    onFiltrarNotas(filtro: FiltroNotaFiscal): void {
      if (this.listaDeNotasComponent) {
        this.listaDeNotasComponent.aplicarFiltroNaLista(filtro);
      }
    }

    onLimparFiltros(): void {
      if (this.listaDeNotasComponent) {
        this.listaDeNotasComponent.limparFiltroNaLista();
      }
    }

}
