import { getRepository } from "typeorm";
import { Category } from "../../../entities/Category";

export class GetAllCategoryUseCase{
  async execute(){
    const repo = getRepository(Category);
    const category = await repo.find();
    return category;
  }
}