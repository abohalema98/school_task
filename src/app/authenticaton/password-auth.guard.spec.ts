import { TestBed } from '@angular/core/testing';

import { PasswordAuthGuard } from './password-auth.guard';

describe('PasswordAuthGuard', () => {
  let guard: PasswordAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PasswordAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
