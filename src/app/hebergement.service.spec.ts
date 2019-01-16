import { TestBed } from '@angular/core/testing';

import { HebergementService } from './hebergement.service';

describe('HebergementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HebergementService = TestBed.get(HebergementService);
    expect(service).toBeTruthy();
  });
});
