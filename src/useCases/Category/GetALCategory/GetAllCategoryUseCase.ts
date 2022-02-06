import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";

export class GetAllCategoryUseCase{
  constructor(
    private getAllCategoriesRepository: ICategoriesRepository,
  ){}
  async execute(){
    const category = await this.getAllCategoriesRepository.findAll();
    return category;
  }
}