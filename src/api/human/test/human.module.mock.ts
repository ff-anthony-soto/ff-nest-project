import { getRepositoryToken } from '@nestjs/typeorm';
import { Test } from '@nestjs/testing';

import { HumanResolver } from '@api/human/human.resolver';
import { HumanService } from '@api/human/human.service';
import { Human } from '@shared/datasource/database/model/human.entity';
import { CatHuman } from '@shared/datasource/database/model/cat-human.entity';

export default Test.createTestingModule({
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
  ],
  exports: [HumanService],
});
