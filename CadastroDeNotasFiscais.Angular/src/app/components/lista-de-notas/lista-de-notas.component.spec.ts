import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeNotasComponent } from './lista-de-notas.component';

describe('ListaDeNotasComponent', () => {
  let component: ListaDeNotasComponent;
  let fixture: ComponentFixture<ListaDeNotasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListaDeNotasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeNotasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
