import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListenotesComponent } from './listenotes.component';

describe('ListenotesComponent', () => {
  let component: ListenotesComponent;
  let fixture: ComponentFixture<ListenotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListenotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListenotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
