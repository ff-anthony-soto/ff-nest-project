import * as Dataloader from 'dataloader';

import { Cat } from '@api/cat/model/cat';
import { Human } from '@api/human/model/human';
import { Breed } from '@api/breed/model/breed';

export interface IDataloader {
  humanCatsDataloader: Dataloader<number, Cat[]>;
  catHumanDataloader: Dataloader<number, Human[]>;
  catBreedDataloader: Dataloader<number, Breed[]>;
  breedCatDataloader: Dataloader<number, Cat[]>;
}
