import { TestBed } from '@angular/core/testing';

import { WizardguardGuard } from './wizardguard.guard';

describe('WizardguardGuard', () => {
  let guard: WizardguardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(WizardguardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
