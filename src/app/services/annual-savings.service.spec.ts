import { TestBed } from '@angular/core/testing';

import { AnnualSavingsService } from './annual-savings.service';

describe('AnnualSavingsService', () => {
  let service: AnnualSavingsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnualSavingsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
