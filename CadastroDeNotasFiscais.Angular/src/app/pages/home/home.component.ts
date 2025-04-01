import { Component } from '@angular/core';
import { BarraDeFiltrosComponent } from '../../components/barra-de-filtros/barra-de-filtros.component';
import { ListaDeNotasComponent } from '../../components/lista-de-notas/lista-de-notas.component';
@Component({
  selector: 'app-home',
  standalone: true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  imports: [BarraDeFiltrosComponent, ListaDeNotasComponent]
})
export class HomeComponent {

}
