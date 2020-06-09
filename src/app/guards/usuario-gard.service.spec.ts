import { TestBed } from '@angular/core/testing';

import { UsuarioGardService } from './usuario-gard.service';

describe('UsuarioGardService', () => {
  let service: UsuarioGardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuarioGardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
