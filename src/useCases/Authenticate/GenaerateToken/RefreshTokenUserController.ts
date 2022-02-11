import { Request, Response } from "express";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";

export class RefreshTokenUserController{
  constructor(
    private refreshTokenUserUseCase: RefreshTokenUserUseCase,
  ){}
  async handle(request: Request, response: Response){
    const {refresh_token} = request.body;
    
    const result = await this.refreshTokenUserUseCase.execute(refresh_token);
    if(result instanceof Error){
      return response.status(400).json(result.message);
    }
    return response.status(200).json(result)
  }
}