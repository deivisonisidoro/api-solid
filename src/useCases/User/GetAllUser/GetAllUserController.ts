import { Request, Response } from "express";
import { GetAllUserUseCase } from "./GetAllUserUseCase";

export class GetAllUserController{
  constructor(
    private getAllUserUseCase: GetAllUserUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response>{

    
    try {
      const users = await this.getAllUserUseCase.execute()
      return response.status(201).json(users);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error."
      })
    }
  }
}