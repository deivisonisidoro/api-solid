import { Request, Response } from "express";
import { GetAllVideosUseCase } from "./GetAllVideosUseCase";

export class GetAllVideosController{
  constructor(
    private getAllVideosUseCase: GetAllVideosUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response>{
    try {
      const {page} = request.params;
      const categories = await this.getAllVideosUseCase.execute(Number(page))
      return response.status(200).json(categories);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error."
      })
    }
  }
}