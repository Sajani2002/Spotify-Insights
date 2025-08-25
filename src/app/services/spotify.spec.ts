import { TestBed } from '@angular/core/testing';

import { Spotify } from './spotify';

describe('Spotify', () => {
  let service: Spotify;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Spotify);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
