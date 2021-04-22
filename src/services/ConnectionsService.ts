import { getCustomRepository, Repository } from "typeorm";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";
import { Connection } from "../entities/Connections";

interface IConnectionsCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {

  private connectionsRepository: Repository<Connection>;

  constructor() {
    this.connectionsRepository = getCustomRepository(ConnectionsRepository);
  }

  async create( { socket_id, user_id, admin_id, id }: IConnectionsCreate ) {

    const connections = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id
    })
  
    await this.connectionsRepository.save(connections);

    return connections;

  }

  async findByUserId( user_id : string ) {

    const connection = await this.connectionsRepository.findOne({
      user_id
    });

    return connection;

  }

}

export { ConnectionsService };