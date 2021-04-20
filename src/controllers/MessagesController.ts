import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { MessagesRepository } from "../repositories/MessagesRepository";

class MessagesController {

  async create( request: Request, response: Response ) {
    const { admin_id, user } = request.body;

    const messagesRepository = getCustomRepository(MessagesRepository);
  
    const messages = messagesRepository.create({
      admin_id,
      user
    })
  
    await messagesRepository.save(messages);
  
    return response.json(messages);
  }

}

export { MessagesController }