import { getCustomRepository, Repository } from "typeorm";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";
import { Connection } from "../entities/Connections";

interface IConnectionsCreate {
  admin_id: string;
}

class ConnectionsService {

  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create( { admin_id }: IConnectionsCreate ) {

    const settings = this.connectionsRepository.create({
      admin_id
    })
  
    await this.connectionsRepository.save(settings);

    return settings;

  }

}

export { ConnectionsService };