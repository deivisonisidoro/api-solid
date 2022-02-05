import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

export class CreateUserController{
  constructor(
    private createUserCase: CreateUserUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response>{
    const {id, name, email, password, created_at}= request.body;
    const result = await this.createUserCase.execute({
      id,
      name,
      email,
      password,
      created_at
    })
    if(result instanceof Error){
      return response.status(400).json(result.message);
    }
    return response.status(201).json(result);

  }
}