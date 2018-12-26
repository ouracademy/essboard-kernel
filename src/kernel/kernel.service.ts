import { Injectable, Inject, BadRequestException } from '@nestjs/common';

export interface Alpha {
  id: string;
  name: string;
  area: string;
}

export interface State {
  id: string;
  name: string;
  previousId: string;
}

@Injectable()
export class KernelService {
  constructor(@Inject('Neo4jDriver') private readonly neo4jDriver) {}

  public async getAlphas(): Promise<Alpha> {
    const session = this.neo4jDriver.session();
    return session
      .run(
        `MATCH (alpha:Alpha)-[:BELONGS_AREA]->(area:Area)
        RETURN alpha.id AS id,alpha.name AS name,area.id AS area
        ORDER BY id`,
      )
      .then(result => {
        session.close();
        return result.records.map(record => record.toObject());
      })
      .catch(error => Promise.reject(new BadRequestException(error)));
  }

  public async getAlpha(alphaId: string): Promise<any> {
    const session = this.neo4jDriver.session();
    return session
      .run(
        `MATCH (checkpoint:Checkpoint)<-[:HAS_CHECKPOINTS]-(state: State)-[:BELONGS_ALPHA]->(alpha:Alpha {id: {alphaId} })
        OPTIONAL MATCH (state)<-[:PREVIOUS_FROM]-(prev: State)
        RETURN  state.id as id, state.name as name, collect({id: checkpoint.id}) as checklist ORDER BY id`,
        { alphaId },
      )
      .then(result => {
        session.close();
        return result.records.map(record => record.toObject());
      })
      .catch(error => {
        return Promise.reject(new BadRequestException(error));
      });
  }
  public async getAlphasWithAllDetail(): Promise<any> {
    const session = this.neo4jDriver.session();
    return session
      .run(
        `MATCH (checkpoint:Checkpoint)<-[:HAS_CHECKPOINTS]-(state: State)-[:BELONGS_ALPHA]->(alpha:Alpha )
        OPTIONAL MATCH (state)<-[:PREVIOUS_FROM]-(prev: State)
        RETURN  alpha.id as alphaId, state.id as id, state.name as name, collect({id: checkpoint.id}) as checklist ORDER BY id`,
      )
      .then(result => {
        session.close();
        return result.records.map(record => record.toObject());
      })
      .catch(error => {
        return Promise.reject(new BadRequestException(error));
      });
  }

  public async getStates(alphaId: string): Promise<State> {
    const session = this.neo4jDriver.session();
    return session
      .run(
        `MATCH (state: State)-[:BELONGS_ALPHA]->(alpha:Alpha {id: {alphaId} })-[:BELONGS_AREA]->(area:Area)
        OPTIONAL MATCH (state)<-[:PREVIOUS_FROM]-(prev: State)
        WITH state,alpha,prev,area
        ORDER BY state.id
        RETURN alpha.id AS id,alpha.name AS name,area.id AS area,
        collect({id: state.id, name: state.name, previous: prev.id}) as states`,
        { alphaId },
      )
      .then(result => {
        session.close();
        return result.records.map(record => record.toObject())[0];
      })
      .catch(error => Promise.reject(new BadRequestException(error)));
  }

  public async getkernelSchema(): Promise<State> {
    const session = this.neo4jDriver.session();
    return session
      .run(
        `MATCH (state: State)-[:BELONGS_ALPHA]->(alpha:Alpha)
        OPTIONAL MATCH (state)<-[:PREVIOUS_FROM]-(prev: State)
        WITH state,alpha,prev
        ORDER BY state.id
        RETURN alpha.id as id, collect({id: state.id, previous: prev.id}) as states
        ORDER BY id`,
      )
      .then(result => {
        session.close();
        return result.records.map(record => record.toObject());
      })
      .catch(error => Promise.reject(new BadRequestException(error)));
  }

  public getCheckpoints(stateId) {
    const session = this.neo4jDriver.session();
    return session
      .run(
        `MATCH (state: State {id: {stateId} })-[:HAS_CHECKPOINTS]->(checkpoint:Checkpoint)
        RETURN checkpoint.id as id, checkpoint.name as name, checkpoint.description as description,
          checkpoint.isVisibleInCard as isVisibleInCard ORDER BY id`,
        { stateId },
      )
      .then(result => {
        session.close();
        return result.records.map(record => record.toObject());
      })
      .catch(error => Promise.reject(new BadRequestException(error)));
  }
  public getkermel() {
    const session = this.neo4jDriver.session();
    return session
      .run(
        `MATCH (alpha:Alpha)-[:BELONGS_AREA]->(area:Area)
        MATCH (state: State {id: {stateId} })-[:HAS_CHECKPOINTS]->(checkpoint:Checkpoint)
        RETURN checkpoint.id as id, checkpoint.name as name, checkpoint.description as description,
          checkpoint.isVisibleInCard as isVisibleInCard ORDER BY id`,
      )
      .then(result => {
        session.close();
        return result.records.map(record => record.toObject());
      })
      .catch(error => Promise.reject(new BadRequestException(error)));
  }
}
