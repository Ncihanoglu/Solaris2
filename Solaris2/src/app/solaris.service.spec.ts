import { TestBed, inject } from '@angular/core/testing';

import { SolarisService } from './solaris.service';

describe('SolarisService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SolarisService]
    });
  });

  it('should ...', inject([SolarisService], (service: SolarisService) => {
    expect(service).toBeTruthy();
  }));
});
