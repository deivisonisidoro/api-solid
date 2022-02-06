import { Request, Response } from "express";
import { CreateVideoUseCase } from "./CreateVideoUseCase";

export class CreateVideoController{
  constructor(
    private createVideoUseCase: CreateVideoUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response>{
    const { name, duration, description, category_id}= request.body;
    const result = await this.createVideoUseCase.execute({
      name,
      duration,
      description, 
      category_id,
    })
    if(result instanceof Error ){
      return response.status(400).json(result.message);
    }

    return response.status(201).json(result);  
  }
}