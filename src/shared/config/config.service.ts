import * as dotenv from 'dotenv';
import * as Joi from '@hapi/joi';
import * as fs from 'fs';

import { GqlModuleOptions } from '@nestjs/graphql';
import { InternalServerErrorException } from '@nestjs/common';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import entities from '@shared/datasource/database/entities';

interface IEnvConfig {
  NODE_ENV: string;
  PORT: string;
  API_AUTH_ENABLED: string;
  DB_HOST: string;
  DB_PORT: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_NAME: string;
}

export class ConfigService {
  private readonly envConfig: IEnvConfig;

  constructor(filePath: string) {
    const config: IEnvConfig = dotenv.parse(fs.readFileSync(filePath)) as any;
    this.envConfig = this.validateInput(config);

    this.get = this.get.bind(this);
  }

  public get(key: keyof IEnvConfig): string {
    return this.envConfig[`${key}`];
  }

  public get isApiAuthEnabled(): boolean {
    return Boolean(this.envConfig.API_AUTH_ENABLED);
  }

  public get graphql(): GqlModuleOptions {
    const { get } = this;

    return {
      autoSchemaFile: 'schema.gql',
      playground: get('NODE_ENV') === 'development',
    };
  }

  public get typeORM(): MysqlConnectionOptions {
    const { get } = this;

    return {
      type: 'mysql',
      port: parseInt(get('DB_PORT'), 10),
      host: get('DB_HOST'),
      username: get('DB_USER'),
      password: get('DB_PASSWORD'),
      database: get('DB_NAME'),
      synchronize: true,
      logging: false,
      entities,
    };
  }

  private validateInput(envConfig: IEnvConfig): IEnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
      NODE_ENV: Joi.string()
        .valid('development', 'production')
        .default('development'),
      PORT: Joi.number().default(5000),
      API_AUTH_ENABLED: Joi.boolean().required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.number().default(3306),
      DB_USER: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_NAME: Joi.string().required(),
    });

    const { error, value: validatedEnvConfig } = envVarsSchema.validate(envConfig);

    if (error) {
      throw new InternalServerErrorException(`Config validation error: ${error.message}`);
    }

    return validatedEnvConfig;
  }
}
