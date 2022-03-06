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
    
    return response.status(200).json(result)
  }
}