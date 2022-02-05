import { getRepository } from "typeorm";
import { Category } from "../../../entities/Category";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";
import { ICreateCategoryRequestDTO } from "./CreateCategoryDTO";


export class CreateCategoryUseCase{
  constructor(
    private categoryRepository: ICategoryRepository,

  ){}
  async execute(data: ICreateCategoryRequestDTO): Promise<Category | Error> {
    const categoryAlreadyExists = await this.categoryRepository.findByName(data.name);
    if(categoryAlreadyExists){
      return new Error("Category already exists.")
    }
    const category = await this.categoryRepository.create(data);

    await this.categoryRepository.save(category);
    return category;
  }
}