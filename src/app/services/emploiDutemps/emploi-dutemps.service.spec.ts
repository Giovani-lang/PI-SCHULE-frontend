import { TestBed } from '@angular/core/testing';

import { EmploiDutempsService } from './emploi-dutemps.service';

describe('EmploiDutempsService', () => {
  let service: EmploiDutempsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmploiDutempsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
