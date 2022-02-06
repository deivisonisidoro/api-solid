import { IVideosRepository } from "../../../repositories/IVideosRepository";

export class GetAllVideosUseCase{
  constructor(
    private getAllVideosRepository: IVideosRepository,
  ){}
  async execute(){
    const videos = await this.getAllVideosRepository.findAll();
    return videos;
  }
}