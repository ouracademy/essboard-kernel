import { Logger } from '@nestjs/common';
import { parse } from 'dotenv';
import { existsSync, readFileSync } from 'fs';
import { object, string, ObjectSchema, validate } from 'joi';

interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  private logger = new Logger(`ConfigService`, true);

  constructor(filePath: string) {
    if (!existsSync(filePath)) {
      this.logger.error(`Config file ${filePath} not exist`);
      throw new Error();
    }

    this.envConfig = this.validateInput(parse(readFileSync(filePath), 'utf-8'));
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: ObjectSchema = object({
      NEO4J_URI: string(),
      NEO4J_USER: string(),
      NEO4J_PASSWORD: string(),
    });

    const { error, value: validatedEnvConfig } = validate(
      envConfig,
      envVarsSchema,
    );

    if (error) {
      this.logger.error(`Config validation error: ${error.message}`);
      throw new Error();
    }

    return validatedEnvConfig;
  }

  get environment(): string {
    return process.env.NODE_ENV || 'development';
  }

  get neo4jURI(): string {
    return this.envConfig.NEO4J_URI;
  }

  get neo4jUser(): string {
    return this.envConfig.NEO4J_USER;
  }

  get neo4jPassword(): string {
    return this.envConfig.NEO4J_PASSWORD;
  }
}
