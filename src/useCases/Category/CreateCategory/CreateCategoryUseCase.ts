import { getRepository } from "typeorm";
import { Category } from "../../../entities/Category";
import { ICreateCategoryRequestDTO } from "./CreateCategoryDTO";


export class CreateCategoryUseCase{

  async execute(data: ICreateCategoryRequestDTO): Promise<Category | Error> {
    const repo = getRepository(Category);
    if(await repo.findOne(data.name)){
      return new Error("Category already exists.")
    }
    const category = repo.create(data);

    await repo.save(category);
    return category;
  }
}