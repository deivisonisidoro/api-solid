import { Request, Response } from "express";
import {DeleteCategoryUseCase} from './DeleteCategoryUseCase'
export class DeleteCategoryController{
  constructor(
    private deleteCategoryCase: DeleteCategoryUseCase
  ){}

  async handle(request: Request, response: Response){

    const {id} = request.params;
    const result = await this.deleteCategoryCase.execute({id});
    if(result instanceof Error){
      return response.status(400).json(result.message);
    }
    return response.status(204).end();
  }
}