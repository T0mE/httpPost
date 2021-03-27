import { TestBed } from '@angular/core/testing';

import { DaneService } from './dane.service';

describe('DaneService', () => {
  let service: DaneService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaneService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
