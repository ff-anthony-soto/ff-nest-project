import { Module } from '@nestjs/common';

import { FileService } from './file.service';
import { S3Module } from '@shared/datasource/aws/s3/s3.module';

@Module({
  imports: [S3Module],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
