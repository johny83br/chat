import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { ConnectionsRepository } from "../repositories/ConnectionsRepository";

class ConnectionsController {

  async create( request: Request, response: Response ) {
    const { admin_id, user } = request.body;

    const connectionsRepository = getCustomRepository(ConnectionsRepository);
  
    const connections = connectionsRepository.create({
      admin_id,
      user
    })
  
    await connectionsRepository.save(connections);
  
    return response.json(connections);
  }

}

export { ConnectionsController }