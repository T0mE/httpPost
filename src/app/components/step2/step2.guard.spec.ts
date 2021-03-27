import { TestBed } from '@angular/core/testing';

import { Step2Guard } from './step2.guard';

describe('Step2Guard', () => {
  let guard: Step2Guard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(Step2Guard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
