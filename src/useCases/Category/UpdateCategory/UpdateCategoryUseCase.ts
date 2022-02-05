import { getRepository } from "typeorm";
import { Category } from "../../../entities/Category";
import { IUpdateCategoryRequestDTO } from "./UpdateCategoryDTO";

export class UpdateCategoryUseCase{
  async execute({id, name, description}: IUpdateCategoryRequestDTO ){
    const repo = getRepository(Category);
    const category = await repo.findOne(id);
    if(!category){
      return new Error("Category does not exist");
    }
    category.name = name ? name : category.name;
    category.description = description ? description : category.description;
  
    await repo.save(category);

    return category;
  }
}