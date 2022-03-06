import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { IDeleteCategoryRequestDTO } from "./DeleteCategoryDTO";

export class DeleteCategoryUseCase{
  constructor(
    private deleteCategoriesRepository: ICategoriesRepository,
  ){}
  async execute(date: IDeleteCategoryRequestDTO){
    const categoryAlreadyExists =  await this.deleteCategoriesRepository.findById(date.id);
    if( !categoryAlreadyExists){
      throw new Error("Category does not exits!");
    }
    await this.deleteCategoriesRepository.delete(date.id);

  }
}