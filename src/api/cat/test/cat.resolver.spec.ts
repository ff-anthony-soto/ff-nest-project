import { TestingModule } from '@nestjs/testing';

import CatModule from './cat.module.mock';

import { CatResolver } from '@api/cat/cat.resolver';

describe('CatResolver', () => {
  let resolver: CatResolver;

  beforeEach(async () => {
    const module: TestingModule = await CatModule.compile();

    resolver = module.get<CatResolver>(CatResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
