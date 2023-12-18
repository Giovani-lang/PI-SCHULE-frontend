import { TestBed } from '@angular/core/testing';

import { LemploiService } from './lemploi.service';

describe('LemploiService', () => {
  let service: LemploiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LemploiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
