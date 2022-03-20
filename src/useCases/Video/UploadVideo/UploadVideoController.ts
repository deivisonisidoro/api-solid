import { Request, Response } from "express";
import { UploadVideoUseCase } from "./UploadVideoUseCase";

interface File {
  location?: string
}
export class UploadVideoController{
  constructor(
    private uploadVideoUseCase: UploadVideoUseCase
  ){}

  async handle(request: Request, response: Response): Promise<Response>{
    const {video_id} = request.params;
    const {originalname: file_name, size,  key, location: url} = request.file;
    const result = await this.uploadVideoUseCase.execute({
      url: process.env.STORAGE_TYPE == 'local' ? `${process.env.APP_URL}/files/${key}` : url ,
      key,
      file_name,
      size,
      video_id
    })
    if(result instanceof Error ){
      return response.status(400).json(result.message);
    }

    return response.status(200).json(result);  
  }
}