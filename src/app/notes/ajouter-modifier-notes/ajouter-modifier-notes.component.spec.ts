import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjouterModifierNotesComponent } from './ajouter-modifier-notes.component';

describe('AjouterModifierNotesComponent', () => {
  let component: AjouterModifierNotesComponent;
  let fixture: ComponentFixture<AjouterModifierNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AjouterModifierNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AjouterModifierNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
