import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFichesComponent } from './liste-fiches.component';

describe('ListeFichesComponent', () => {
  let component: ListeFichesComponent;
  let fixture: ComponentFixture<ListeFichesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListeFichesComponent]
    });
    fixture = TestBed.createComponent(ListeFichesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
