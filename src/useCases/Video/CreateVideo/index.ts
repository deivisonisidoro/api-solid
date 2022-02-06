import { MySQLCategoriesRepository } from "../../../repositories/implementations/MySQLCategoriesRepository";
import { MySQLVideosRepository } from "../../../repositories/implementations/MySQLVideosRepository";
import { CreateVideoController } from "./CreateVideoController";
import { CreateVideoUseCase } from "./CreateVideoUseCase";

const createCategoriesRepository = new MySQLCategoriesRepository();
const createVideosRepository = new MySQLVideosRepository();

const createVideoUseCase = new CreateVideoUseCase(
  createVideosRepository,
  createCategoriesRepository,
);

const createVideoController = new CreateVideoController(
  createVideoUseCase
);

export {createVideoUseCase, createVideoController}