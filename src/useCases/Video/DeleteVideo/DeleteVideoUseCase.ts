import { IVideosRepository } from "../../../repositories/IVideosRepository";
import { IDeleteVideoRequestDTO } from "./DeleteVideoDTO";
import aws from 'aws-sdk';
import fs from 'fs';
import path from 'path';
import {promisify} from 'util';

export class DeleteVideoUseCase{
  constructor(
    private videoRepository: IVideosRepository,
  ){}
  async execute(data: IDeleteVideoRequestDTO){
    const videoAlreadyExists = await this.videoRepository.findById(data.id);
    if ( !videoAlreadyExists) {
      throw new Error("Video does not exits!");
    }
    const s3 = new aws.S3();
    if(process.env.STORAGE_TYPE == 's3'){
      await this.videoRepository.delete(data.id);
      return s3.deleteObject({
        Bucket: 'barber-upload-photo',
        Key: videoAlreadyExists.key
      }).promise()
    }else{
      await this.videoRepository.delete(data.id);
      return promisify(fs.unlink)(path.resolve(__dirname, '..', '..', '..', '..', 'tmp', 'uploads',  videoAlreadyExists.key))
    }
    
  }
}