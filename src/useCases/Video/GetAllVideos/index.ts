import { GetAllVideosUseCase } from "./GetAllVideosUseCase";
import {GetAllVideosController} from "./GetAllVideosController";
import { MySQLVideosRepository } from "../../../repositories/implementations/MySQLVideosRepository";

const getAllVideosRepository = new MySQLVideosRepository();


const getAllVideosUseCase = new GetAllVideosUseCase(
  getAllVideosRepository
);

const getAllVideosController = new GetAllVideosController(
  getAllVideosUseCase
);

export {getAllVideosUseCase, getAllVideosController}