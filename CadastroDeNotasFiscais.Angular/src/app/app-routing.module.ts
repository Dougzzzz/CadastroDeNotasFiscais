import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDeNotasComponent } from './components/lista-de-notas/lista-de-notas.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes), ListaDeNotasComponent],
  exports: [RouterModule]
})
export class AppRoutingModule { }
