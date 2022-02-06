import { getRepository } from "typeorm";
import { Category } from "../../../entities/Category";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { IDeleteCategoryRequestDTO } from "./DeleteCategoryDTO";

export class DeleteCategoryUseCase{
  constructor(
    private deleteCategoriesRepository: ICategoriesRepository,
  ){}
  async execute({id}: IDeleteCategoryRequestDTO){
    const categoryAlreadyExists =  await this.deleteCategoriesRepository.findById(id);
    if( !categoryAlreadyExists){
      return new Error("Category does not exits!");
    }
    await this.deleteCategoriesRepository.delete(id);

  }
}