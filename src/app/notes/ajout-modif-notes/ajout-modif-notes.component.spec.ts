import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModifNotesComponent } from './ajout-modif-notes.component';

describe('AjoutModifNotesComponent', () => {
  let component: AjoutModifNotesComponent;
  let fixture: ComponentFixture<AjoutModifNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutModifNotesComponent]
    });
    fixture = TestBed.createComponent(AjoutModifNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
