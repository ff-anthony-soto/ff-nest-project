import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Breed } from '@datasource/database/model/breed.entity';
import { BreedResolver } from './breed.resolver';
import { BreedService } from './breed.service';

@Module({
  imports: [TypeOrmModule.forFeature([Breed])],
  providers: [BreedResolver, BreedService],
  exports: [BreedService],
})
export class BreedModule {}
