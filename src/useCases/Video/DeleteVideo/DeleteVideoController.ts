import { Request, Response } from "express";
import {DeleteVideoUseCase} from './DeleteVideoUseCase'
export class DeleteVideoController{
  constructor(
    private deleteVideoCase: DeleteVideoUseCase
  ){}

  async handle(request: Request, response: Response){

    const {id} = request.params;
    await this.deleteVideoCase.execute({id});
    return response.status(204).end();
  }
}