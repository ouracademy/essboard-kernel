import { Module, Global } from '@nestjs/common';
import { v1 as neo4j } from 'neo4j-driver';
import { ConfigService } from 'config/config.service';

export const Neo4jFactory = {
  provide: 'Neo4jDriver',
  useFactory: (config: ConfigService) => {
    return neo4j.driver(
      config.neo4jURI,
      neo4j.auth.basic(config.neo4jUser, config.neo4jPassword),
    );
  },
  inject: ['ConfigService'],
};

@Global()
@Module({
  providers: [Neo4jFactory],
  exports: [Neo4jFactory],
})
export class DatabaseModule {}
