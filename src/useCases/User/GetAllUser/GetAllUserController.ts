import { Request, Response } from "express";
import { GetAllUserUseCase } from "./GetAllUserUseCase";

export class GetAllUserController{
  constructor(
    private getAllUserUseCase: GetAllUserUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response>{
   
    
    try {
      const {page} = request.params;
      
      const users = await this.getAllUserUseCase.execute(Number(page))
      return response.status(200).json(users);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error."
      })
    }
  }
}