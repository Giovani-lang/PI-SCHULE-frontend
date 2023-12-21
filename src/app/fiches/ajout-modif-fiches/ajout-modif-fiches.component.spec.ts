import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AjoutModifFichesComponent } from './ajout-modif-fiches.component';

describe('AjoutModifFichesComponent', () => {
  let component: AjoutModifFichesComponent;
  let fixture: ComponentFixture<AjoutModifFichesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AjoutModifFichesComponent]
    });
    fixture = TestBed.createComponent(AjoutModifFichesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
