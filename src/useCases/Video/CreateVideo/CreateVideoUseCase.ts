import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { IVideosRepository } from "../../../repositories/IVideosRepository";
import { ICreateVideoRequestDTO } from "./CreateVideoDTO";

export class CreateVideoUseCase{
  constructor(
    private createVideosRepository: IVideosRepository,
    private createCategoriesRepository: ICategoriesRepository,
  ){}
  async execute(data: ICreateVideoRequestDTO){
    
    const categoryAlreadyExists = await this.createCategoriesRepository.findById(data.category_id);
    
    if(!categoryAlreadyExists){
      throw new Error("Category does not exist!");
    }

    const video = await this.createVideosRepository.create(data)

    await  this.createVideosRepository.save(video)

    return video;

  }
}