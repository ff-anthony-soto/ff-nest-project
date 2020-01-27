import { Module } from '@nestjs/common';

import { ConfigModule } from '@config/config.module';
import { AuthModule } from '@shared/auth/auth.module';
import { GraphqlModule } from '@config/modules/graphql/graphql.module';
import { TypeormModule } from '@config/modules/typeorm/typeorm.module';
import { DataloaderModule } from '@shared/modules/dataloader/dataloader.module';

@Module({
  imports: [ConfigModule, GraphqlModule, TypeormModule, DataloaderModule, AuthModule],
})
export class AppModule {}
