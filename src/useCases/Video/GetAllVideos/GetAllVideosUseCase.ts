import { IVideosRepository } from "../../../repositories/IVideosRepository";

export class GetAllVideosUseCase{
  constructor(
    private getAllVideosRepository: IVideosRepository,
  ){}
  async execute(page: number){
    const videos = await this.getAllVideosRepository.findAll(page);
    return videos;
  }
}