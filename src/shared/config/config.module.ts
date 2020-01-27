import * as AWS from 'aws-sdk';
import { Module, Global } from '@nestjs/common';

import { ConfigService } from './config.service';
import { AwsModule } from './modules/aws/aws.module';
@Global()
@Module({
  providers: [
    {
      provide: ConfigService,
      useValue: new ConfigService(`.env.${process.env.NODE_ENV || 'development'}`),
    },
  ],
  exports: [ConfigService],
  imports: [AwsModule],
})
export class ConfigModule {
  constructor(private configService: ConfigService) {
    AWS.config.update(this.configService.aws);
  }
}
