import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { HumanResolver } from './human.resolver';
import { HumanService } from './human.service';
import { Human } from '@shared/datasource/database/model/human.entity';
import { CatHuman } from '@shared/datasource/database/model/cat-human.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Human, CatHuman])],
  providers: [HumanResolver, HumanService],
  exports: [HumanService],
})
export class HumanModule {}
