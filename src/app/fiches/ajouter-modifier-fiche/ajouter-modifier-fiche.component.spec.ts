import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterModifierFicheComponent } from './ajouter-modifier-fiche.component';

describe('AjouterModifierFicheComponent', () => {
  let component: AjouterModifierFicheComponent;
  let fixture: ComponentFixture<AjouterModifierFicheComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterModifierFicheComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterModifierFicheComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
