import { TestingModule } from '@nestjs/testing';

import ConfigModule from './config.module.mock';
import { ConfigService } from '@config/config.service';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await ConfigModule.compile();

    service = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
