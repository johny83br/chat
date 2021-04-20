import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

class UsersController {

  async create( request: Request, response: Response ) {
    const { email } = request.body;

    const usersRepository = getCustomRepository(UsersRepository);
  
    const users = usersRepository.create({
      email
    })
  
    await usersRepository.save(users);
  
    return response.json(users);
  }

}

export { UsersController }