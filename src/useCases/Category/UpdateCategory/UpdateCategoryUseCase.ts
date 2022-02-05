import { getRepository } from "typeorm";
import { Category } from "../../../entities/Category";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";
import { IUpdateCategoryRequestDTO } from "./UpdateCategoryDTO";

export class UpdateCategoryUseCase{
  constructor(
    private categoryRepository: ICategoryRepository,
  ){}
  async execute({id, name, description}: IUpdateCategoryRequestDTO ){
    const categoryAlreadyExists = await this.categoryRepository.findById(id)
    if(!categoryAlreadyExists){
      return new Error("Category does not exist");
    }
    
    categoryAlreadyExists.name = name ? name : categoryAlreadyExists.name;
    categoryAlreadyExists.description = description ? description : categoryAlreadyExists.description;

    await this.categoryRepository.save(categoryAlreadyExists);
    return categoryAlreadyExists;
  }
}