import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';

@Component({
  selector: 'app-barra-de-filtros',
  standalone: true,
  templateUrl: './barra-de-filtros.component.html',
  styleUrl: './barra-de-filtros.component.css',
  imports: [MatExpansionModule, MatFormFieldModule, MatDatepickerModule, MatInputModule],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarraDeFiltrosComponent {
  readonly panelOpenState = signal(false);
}
