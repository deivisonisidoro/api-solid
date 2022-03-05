import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController{
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response>{
    const {id, name, description, created_at}= request.body;
    const result = await this.createCategoryUseCase.execute({
      id,
      name,
      description,
      created_at
    })
    

    return response.status(201).json(result);  
  }
}