import { Request, Response } from "express";
import { ConnectionsService } from "../services/ConnectionsService";

class ConnectionsController {

  async create( request: Request, response: Response ) {
    const {
      socket_id,
      user_id,
      admin_id,
      id
    } = request.body;

    const connectionsService = new ConnectionsService();

    const connections = await connectionsService.create({
      socket_id,
      user_id,
      admin_id,
      id
    });
    return response.json(connections);

  }

}

export { ConnectionsController }