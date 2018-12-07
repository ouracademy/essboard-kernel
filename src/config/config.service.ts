import { Logger } from '@nestjs/common';


interface EnvConfig {
  [key: string]: string;
}

export class ConfigService {
  private readonly envConfig: EnvConfig;
  private logger = new Logger(`ConfigService`, true);

  constructor() {
    if (process.env.NODE_ENV !== 'production') require('dotenv').config();

    this.envConfig = process.env;
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
