import { Test } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { BreedService } from './../breed.service';
import { BreedResolver } from './../breed.resolver';
import { Breed } from './../model/breed';

export default Test.createTestingModule({
  providers: [
    BreedResolver,
    BreedService,
    {
      provide: getRepositoryToken(Breed),
      useValue: {},
    },
  ],
  exports: [BreedService],
});
