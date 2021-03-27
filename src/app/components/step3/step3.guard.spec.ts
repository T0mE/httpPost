import { TestBed } from '@angular/core/testing';

import { Step3Guard } from './step3.guard';

describe('Step3Guard', () => {
  let guard: Step3Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Step3Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
