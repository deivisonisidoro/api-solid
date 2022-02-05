import { Request, Response } from "express";
import {DeleteUserUseCase} from './DeleteUserUseCase'
export class DeleteUserController{
  constructor(
    private deleteUserCase: DeleteUserUseCase
  ){}

  async handle(request: Request, response: Response){

    const {id} = request.params;
    const result = await this.deleteUserCase.execute({id});
    if(result instanceof Error){
      return response.status(400).json(result.message);
    }
    return response.status(204).end();
  }
}