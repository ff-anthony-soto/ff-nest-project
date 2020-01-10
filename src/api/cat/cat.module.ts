import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CatResolver } from './cat.resolver';
import { CatService } from './cat.service';
import { Cat } from '@shared/datasource/database/model/cat.entity';
import { CatHuman } from '@datasource/database/model/cat-human.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cat, CatHuman])],
  providers: [CatResolver, CatService],
  exports: [CatService],
})
export class CatModule {}
