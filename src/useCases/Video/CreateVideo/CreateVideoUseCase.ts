import { Video } from "../../../entities/Video";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { IVideosRepository } from "../../../repositories/IVideosRepository";
import { ICreateVideoRequestDTO } from "./CreateVideoDTO";

export class CreateVideoUseCase{
  constructor(
    private createVideosRepository: IVideosRepository,
    private createCategoriesRepository: ICategoriesRepository,
  ){}
  async execute({ name, description, duration, category_id}: ICreateVideoRequestDTO):Promise<Video |Error>{
    const categoryAlreadyExists = await this.createCategoriesRepository.findById(category_id);
    
    if(!categoryAlreadyExists){
      return new Error("Category does not exist");
    }

    const video = await this.createVideosRepository.create({name, description, duration, category_id})

    await  this.createVideosRepository.save(video)

    return video;

  }
}