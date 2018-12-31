/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { VolService } from './vol.service';

describe('VolService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [VolService]
    });
  });

  it('should ...', inject([VolService], (service: VolService) => {
    expect(service).toBeTruthy();
  }));
});
