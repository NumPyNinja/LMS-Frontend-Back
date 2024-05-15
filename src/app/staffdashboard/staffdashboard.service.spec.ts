import { TestBed } from '@angular/core/testing';

import { StaffdashboardService } from './staffdashboard.service';

describe('StaffdashboardService', () => {
  let service: StaffdashboardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StaffdashboardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
