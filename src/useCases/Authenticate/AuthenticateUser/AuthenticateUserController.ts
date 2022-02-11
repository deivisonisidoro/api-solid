import { Request, Response } from "express";
import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";

export class AuthenticateUserController{
  constructor(
    private authenticateUserCase: AuthenticateUserUseCase
  ){}

  async handle(request: Request, response: Response){
    const {email, password}= request.body;

    const result = await this.authenticateUserCase.execute({
      email,
      password
    })
    if(result instanceof Error){
      return response.status(400).json(result.message);
    }
    return response.json(result)
  }
}