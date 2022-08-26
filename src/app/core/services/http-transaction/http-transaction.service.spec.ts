import { TestBed } from '@angular/core/testing';

import { HttpTransactionService } from './http-transaction.service';

describe('HttpTransactionService', () => {
  let service: HttpTransactionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HttpTransactionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
