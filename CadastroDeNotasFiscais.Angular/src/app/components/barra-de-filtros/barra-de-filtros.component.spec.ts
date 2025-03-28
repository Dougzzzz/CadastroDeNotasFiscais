import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraDeFiltrosComponent } from './barra-de-filtros.component';

describe('BarraDeFiltrosComponent', () => {
  let component: BarraDeFiltrosComponent;
  let fixture: ComponentFixture<BarraDeFiltrosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BarraDeFiltrosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BarraDeFiltrosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
