import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule } from '@config/config.module';
import { ConfigService } from '@config/config.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => configService.typeORM,
      inject: [ConfigService],
    }),
  ],
})
export class TypeormModule {}
