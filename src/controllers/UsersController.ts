import { Request, Response } from "express";
import { UsersService } from "../services/UsersService";

class UsersController {

  async create( request: Request, response: Response ): Promise<Response> {
    const { email } = request.body;

    const usersService = new UsersService();

    const users = await usersService.create(email);
    return response.json(users);
  
  }

  async showUser(request: Request, response: Response): Promise<Response> {

    const { id } = request.params;

    const usersService = new UsersService();

    try {
      const user = await usersService.findByUser(id);
      return response.json(user);
    } catch ( error ) {
      response.json({message: error.message});
    }

  }

}

export { UsersController }