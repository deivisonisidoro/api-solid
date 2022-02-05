import { MySQLCategoryRepository } from "../../../repositories/implementations/MySQLCategoryRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const categoryRepository = new MySQLCategoryRepository();

const createCategoryUseCase = new CreateCategoryUseCase(
  categoryRepository
);

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export {createCategoryUseCase,createCategoryController}