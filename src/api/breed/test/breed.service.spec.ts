import { TestingModule } from '@nestjs/testing';

import BreedModule from './breed.module.mock';
import { BreedService } from '../breed.service';

describe('BreedService', () => {
  let service: BreedService;

  beforeEach(async () => {
    const module: TestingModule = await BreedModule.compile();

    service = module.get<BreedService>(BreedService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
