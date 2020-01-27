import * as AWS from 'aws-sdk';

import { Injectable, OnModuleInit } from '@nestjs/common';

@Injectable()
export class S3Service implements OnModuleInit {
  private s3: AWS.S3;

  public onModuleInit() {
    this.s3 = new AWS.S3();
  }

  public async upload(s3Config: AWS.S3.GetObjectRequest): Promise<AWS.S3.ManagedUpload.SendData> {
    return this.s3.upload(s3Config).promise();
  }

  public get(s3Config: AWS.S3.GetObjectRequest): Promise<AWS.S3.GetObjectOutput> {
    return this.s3.getObject(s3Config).promise();
  }

  public getMany(s3Config: AWS.S3.ListObjectsRequest): Promise<AWS.S3.ListObjectsOutput> {
    return this.s3.listObjects(s3Config).promise();
  }

  public save(s3Config: AWS.S3.PutObjectRequest): Promise<AWS.S3.PutObjectOutput> {
    return this.s3.putObject(s3Config).promise();
  }

  public delete(s3Config: AWS.S3.DeleteObjectRequest): Promise<AWS.S3.DeleteObjectOutput> {
    return this.s3.deleteObject(s3Config).promise();
  }
}
