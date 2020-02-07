import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';

import { HumanResolver } from '@api/human/human.resolver';
import { HumanService } from '@api/human/human.service';
import { Human } from '@shared/datasource/database/model/human.entity';
import { CatHuman } from '@shared/datasource/database/model/cat-human.entity';
import { FileService } from '@shared/modules/file/file.service';
import { S3Service } from '@shared/datasource/aws/s3/s3.service';
import { ConfigService } from '@shared/config/config.service';

export default Test.createTestingModule({
  imports: [],
  providers: [
    HumanResolver,
    HumanService,
    {
      provide: getRepositoryToken(Human),
      useValue: {},
    },
    {
      provide: getRepositoryToken(CatHuman),
      useValue: {},
    },
    {
      provide: ConfigService,
      useValue: new ConfigService('.env.development'),
    },
    FileService,
    S3Service,
  ],
  exports: [HumanService],
});
