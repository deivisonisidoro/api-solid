import { getRepository } from "typeorm";
import { Category } from "../../../entities/Category";
import { ICategoryRepository } from "../../../repositories/ICategoryRepository";
import { IDeleteCategoryRequestDTO } from "./DeleteCategoryDTO";

export class DeleteCategoryUseCase{
  constructor(
    private categoryRepository: ICategoryRepository,
  ){}
  async execute({id}: IDeleteCategoryRequestDTO){
    const categoryAlreadyExists =  await this.categoryRepository.findById(id);
    if( !categoryAlreadyExists){
      return new Error("Category does not exits!");
    }
    await this.categoryRepository.delete(id);

  }
}