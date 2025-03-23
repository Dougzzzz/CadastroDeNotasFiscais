import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ListaDeNotasComponent } from './components/lista-de-notas/lista-de-notas.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false, 
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'CadastroDeNotasFiscais.Angular';
}