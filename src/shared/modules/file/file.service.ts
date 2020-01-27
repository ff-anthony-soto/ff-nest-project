import { Injectable } from '@nestjs/common';

import { ConfigService } from '@config/config.service';
import { S3Service } from '@datasource/aws/s3/s3.service';

@Injectable()
export class FileService {
  constructor(private readonly configService: ConfigService, private readonly s3Service: S3Service) {}

  public async uploadFile(base64: string, key: string) {
    const base64MineType = this.getBase64MimeType(base64);
    const base64Type = this.getBase64Type(base64MineType);

    const s3Config = {
      ACL: 'public-read',
      Body: this.getBufferFromBase64(base64, base64Type),
      Bucket: this.configService.get('AWS_S3_BUCKET_NAME'),
      Key: key,
      ContentEncoding: 'base64',
      ContentType: base64MineType,
    };

    return await this.s3Service.upload(s3Config);
  }

  private getBase64Type(base64MineType: string): string {
    return base64MineType.split('/').pop();
  }

  private getBufferFromBase64(base64: string, base64Type: string): Buffer {
    return Buffer.from(base64.replace(this.getBase64Replace(base64Type), ''), 'base64');
  }

  private getBase64MimeType(base64: string): string {
    const mime = typeof base64 === 'string' && base64.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/);

    return mime!.length && mime[1];
  }

  private getBase64Replace(base64Type: string): string {
    const base64Replaces = {
      pdf: 'data:application/pdf;base64,',
      mp3: 'data:audio/mp3;base64,',
    };

    return base64Replaces[base64Type] ? base64Replaces[base64Type] : /^data:image\/\w+;base64,/;
  }
}
