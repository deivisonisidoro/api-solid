import { getRepository } from "typeorm";
import { Category } from "../../../entities/Category";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { IUpdateCategoryRequestDTO } from "./UpdateCategoryDTO";

export class UpdateCategoryUseCase{
  constructor(
    private updateCategoriesRepository: ICategoriesRepository,
  ){}
  async execute({id, name, description}: IUpdateCategoryRequestDTO ){
    const categoryAlreadyExists = await this.updateCategoriesRepository.findById(id)
    if(!categoryAlreadyExists){
      throw new Error("Category does not exist");
    }
    
    categoryAlreadyExists.name = name ? name : categoryAlreadyExists.name;
    categoryAlreadyExists.description = description ? description : categoryAlreadyExists.description;

    await this.updateCategoriesRepository.save(categoryAlreadyExists);
    return categoryAlreadyExists;
  }
}