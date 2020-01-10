import { TestingModule } from '@nestjs/testing';

import CatModule from './cat.module.mock';
import { CatService } from '@api/cat/cat.service';

describe('CatService', () => {
  let service: CatService;

  beforeEach(async () => {
    const module: TestingModule = await CatModule.compile();

    service = module.get<CatService>(CatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
