import { Request, Response } from "express";
import {DeleteUserUseCase} from './DeleteUserUseCase'
export class DeleteUserController{
  constructor(
    private deleteUserCase: DeleteUserUseCase
  ){}

  async handle(request: Request, response: Response){

    const {id} = request.params;
    const {name, email, password} = request.body;
    await this.deleteUserCase.execute({id, name, email, password});
    return response.status(204).end();
  }
}