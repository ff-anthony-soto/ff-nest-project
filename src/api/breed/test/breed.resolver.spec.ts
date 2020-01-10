import { TestingModule } from '@nestjs/testing';

import BreedModule from './breed.module.mock';
import { BreedResolver } from '../breed.resolver';

describe('BreedResolver', () => {
  let resolver: BreedResolver;

  beforeEach(async () => {
    const module: TestingModule = await BreedModule.compile();

    resolver = module.get<BreedResolver>(BreedResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
