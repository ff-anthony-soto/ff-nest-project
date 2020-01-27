import { ConfigService } from '@config/config.service';
import { Test } from '@nestjs/testing';

import { FileService } from '../file.service';
import { S3Service } from '@datasource/aws/s3/s3.service';

export default Test.createTestingModule({
  providers: [
    FileService,
    S3Service,
    {
      provide: ConfigService,
      useValue: new ConfigService('.env.development'),
    },
  ],
  exports: [FileService],
});
