import { TestingModule } from '@nestjs/testing';

import HumanModule from './human.module.mock';
import { HumanResolver } from '@api/human/human.resolver';

describe('HumanResolver', () => {
  let resolver: HumanResolver;

  beforeEach(async () => {
    const module: TestingModule = await HumanModule.compile();

    resolver = module.get<HumanResolver>(HumanResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
