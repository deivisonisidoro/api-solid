import { Request, Response } from "express";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

export class UpdateCategoryController{
  constructor(
    private updateCategoryUseCase: UpdateCategoryUseCase,
  ){}
  
  async handle(request: Request, response: Response){
    const {id} = request.params;
    const {name, description} = request.body;

    const result = await this.updateCategoryUseCase.execute({id, name, description });
    if(result instanceof Error){
      return response.status(400).json(result.message);
    }
    return response.status(200).json(result);

  }
}