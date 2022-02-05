import { Request, Response } from "express";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

export class CreateCategoryController{
  constructor(
    private createCategoryUseCase: CreateCategoryUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response>{
    const {id, name, description, created_at}= request.body;
    
    try {
      const resullt = await this.createCategoryUseCase.execute({
        id,
        name,
        description,
        created_at
      })
      return response.status(201).json(resullt);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error."
      })
    }
  }
}