import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListeFichesComponent } from './liste-fiches.component';

describe('ListeFichesComponent', () => {
  let component: ListeFichesComponent;
  let fixture: ComponentFixture<ListeFichesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListeFichesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListeFichesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
