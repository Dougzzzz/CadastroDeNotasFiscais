import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ListaDeNotasComponent } from './components/lista-de-notas/lista-de-notas.component';
import { HomeComponent } from './pages/home/home.component';
import { BarraDeFiltrosComponent } from './components/barra-de-filtros/barra-de-filtros.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true, 
  styleUrl: './app.component.css',
  imports: [ListaDeNotasComponent, HomeComponent, RouterModule, BarraDeFiltrosComponent],
})
export class AppComponent {
  title = 'CadastroDeNotasFiscais.Angular';
}