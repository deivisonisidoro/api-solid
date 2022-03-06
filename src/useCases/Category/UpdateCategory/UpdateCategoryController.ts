import { Request, Response } from "express";
import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";

export class UpdateCategoryController{
  constructor(
    private updateCategoryUseCase: UpdateCategoryUseCase,
  ){}
  
  async handle(request: Request, response: Response){
    const {id} = request.params;
    const {name, description, created_at} = request.body;

    const result = await this.updateCategoryUseCase.execute({id, name, description, created_at});
    return response.status(200).json(result);

  }
}