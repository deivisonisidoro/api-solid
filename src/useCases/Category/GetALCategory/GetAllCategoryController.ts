import { Request, Response } from "express";
import { GetAllCategoryUseCase } from "./GetAllCategoryUseCase";

export class GetAllCategoryController{
  constructor(
    private getAllCategoryUseCase: GetAllCategoryUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response>{
    try {
      const categories = await this.getAllCategoryUseCase.execute()
      return response.status(200).json(categories);
    } catch (error) {
      return response.status(400).json({
        message: error.message || "Unexpected error."
      })
    }
  }
}