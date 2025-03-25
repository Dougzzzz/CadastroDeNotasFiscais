import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ListaDeNotasComponent } from './components/lista-de-notas/lista-de-notas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true, 
  styleUrl: './app.component.css',
  imports: [ListaDeNotasComponent]
})
export class AppComponent {
  title = 'CadastroDeNotasFiscais.Angular';
}