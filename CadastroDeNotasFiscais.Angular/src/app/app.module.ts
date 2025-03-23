import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ListaDeNotasComponent } from './components/lista-de-notas/lista-de-notas.component';

@NgModule({
  declarations: [
    AppComponent,
    ListaDeNotasComponent
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
