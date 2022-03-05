import { getRepository } from "typeorm";
import { Category } from "../../../entities/Category";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { ICreateCategoryRequestDTO } from "./CreateCategoryDTO";


export class CreateCategoryUseCase{
  constructor(
    private createCategoriesRepository: ICategoriesRepository,

  ){}
  async execute(data: ICreateCategoryRequestDTO) {
  
    const categoryAlreadyExists = await this.createCategoriesRepository.findByName(data.name);
    if(categoryAlreadyExists){
      throw new Error("Category already exists.")
    }
    const category = await this.createCategoriesRepository.create(data);

    await this.createCategoriesRepository.save(category);
    return category;
  }
}