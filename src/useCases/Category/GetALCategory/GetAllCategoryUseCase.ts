import { ICategoryRepository } from "../../../repositories/ICategoryRepository";

export class GetAllCategoryUseCase{
  constructor(
    private categoryRepository: ICategoryRepository,
  ){}
  async execute(){
    const category = await this.categoryRepository.findAll();
    return category;
  }
}