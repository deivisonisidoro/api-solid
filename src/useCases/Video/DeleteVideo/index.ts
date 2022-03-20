import { DeleteVideoUseCase } from "./DeleteVideoUseCase";
import {DeleteVideoController} from "./DeleteVideoController";
import { MySQLVideosRepository } from "../../../repositories/implementations/MySQLVideosRepository";

const videoRepository = new MySQLVideosRepository();
const deleteVideoUseCase = new DeleteVideoUseCase(
  videoRepository,
);

const deleteVideoController = new DeleteVideoController(
  deleteVideoUseCase
);

export {deleteVideoUseCase, deleteVideoController}