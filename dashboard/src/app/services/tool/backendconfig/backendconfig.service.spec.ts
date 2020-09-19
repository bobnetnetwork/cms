import { TestBed } from '@angular/core/testing';

import { BackendConfigService } from './backendconfig.service';

describe('BackendconfigService', () => {
  let service: BackendConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BackendConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
