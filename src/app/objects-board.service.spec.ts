import { TestBed } from '@angular/core/testing';

import { ObjectsBoardService } from './objects-board.service';

describe('ObjectsBoardService', () => {
  let service: ObjectsBoardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectsBoardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
