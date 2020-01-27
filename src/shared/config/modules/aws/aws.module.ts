import * as AWS from 'aws-sdk';

import { Module } from '@nestjs/common';

import { ConfigService } from '@config/config.service';

@Module({})
export class AwsModule {
  constructor(configService: ConfigService) {
    AWS.config.update(configService.aws);
  }
}
