import { Video } from "../../../entities/Video";
import { ICategoriesRepository } from "../../../repositories/ICategoriesRepository";
import { IVideosRepository } from "../../../repositories/IVideosRepository";
import { IUploadVideoRequestDTO } from "./UploadVideoDTO";

export class UploadVideoUseCase{
  constructor(
    private videosRepository: IVideosRepository,
  ){}
  async execute({ url, key, file_name, size, video_id}: IUploadVideoRequestDTO){
    const videoAlreadyExists = await this.videosRepository.findById(video_id);
    
    if(!videoAlreadyExists){
      throw new Error("Video does not exist!");
    }

    videoAlreadyExists.url = url;
    videoAlreadyExists.key = key;
    videoAlreadyExists.file_name = file_name;
    videoAlreadyExists.size = size;
  
    await  this.videosRepository.save(videoAlreadyExists)

    return videoAlreadyExists;

  }
}