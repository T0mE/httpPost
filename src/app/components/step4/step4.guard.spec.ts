import { TestBed } from '@angular/core/testing';

import { Step4Guard } from './step4.guard';

describe('Step4Guard', () => {
  let guard: Step4Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Step4Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
