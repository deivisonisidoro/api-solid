import { MySQLVideosRepository } from "../../../repositories/implementations/MySQLVideosRepository";
import { UploadVideoController } from "./UploadVideoController";
import { UploadVideoUseCase } from "./UploadVideoUseCase";


const uploadVideosRepository = new MySQLVideosRepository();

const uploadVideoUseCase = new UploadVideoUseCase(
  uploadVideosRepository,
);

const uploadVideoController = new UploadVideoController(
  uploadVideoUseCase
);

export {uploadVideoUseCase, uploadVideoController}