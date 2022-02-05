import { getRepository } from "typeorm";
import { Category } from "../../../entities/Category";
import { IDeleteCategoryRequestDTO } from "./DeleteCategoryDTO";

export class DeleteCategoryUseCase{

  async execute({id}: IDeleteCategoryRequestDTO){
    const repo = getRepository(Category);
    if( !await repo.findOne(id)){
      return new Error("Category does not exits!");
    }
    await repo.delete(id);

  }
}