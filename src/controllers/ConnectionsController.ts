import { Request, Response } from "express";
import { ConnectionsService } from "../services/ConnectionsService";

class ConnectionsController {

  async create( request: Request, response: Response ) {
    const { admin_id } = request.body;

    const connectionsService = new ConnectionsService();

    const connections = await connectionsService.create({admin_id});
    return response.json(connections);

  }

}

export { ConnectionsController }