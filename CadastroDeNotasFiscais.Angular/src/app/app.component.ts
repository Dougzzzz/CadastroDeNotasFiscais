import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true, 
  styleUrl: './app.component.css',
  imports: [HomeComponent, RouterModule],
})
export class AppComponent {
  title = 'CadastroDeNotasFiscais.Angular';
}