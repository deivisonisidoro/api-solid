import { Request, Response } from "express";
import {DeleteCategoryUseCase} from './DeleteCategoryUseCase'
export class DeleteCategoryController{
  constructor(
    private deleteCategoryCase: DeleteCategoryUseCase
  ){}

  async handle(request: Request, response: Response){

    const {id} = request.params;
    const { description, name, created_at} = request.body;
    await this.deleteCategoryCase.execute({id, description, name, created_at});
    return response.status(204).end();
  }
}