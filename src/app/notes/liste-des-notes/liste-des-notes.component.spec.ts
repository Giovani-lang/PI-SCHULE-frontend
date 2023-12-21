import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeDesNotesComponent } from './liste-des-notes.component';

describe('ListeDesNotesComponent', () => {
  let component: ListeDesNotesComponent;
  let fixture: ComponentFixture<ListeDesNotesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeDesNotesComponent]
    });
    fixture = TestBed.createComponent(ListeDesNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
