import { TestingModule } from '@nestjs/testing';

import FileModule from './file.module.mock';
import { FileService } from '../file.service';

describe('FileService', () => {
  let service: FileService;

  beforeEach(async () => {
    const module: TestingModule = await FileModule.compile();

    service = module.get<FileService>(FileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
