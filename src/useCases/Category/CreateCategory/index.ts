import { MySQLCategoriesRepository } from "../../../repositories/implementations/MySQLCategoriesRepository";
import { CreateCategoryController } from "./CreateCategoryController";
import { CreateCategoryUseCase } from "./CreateCategoryUseCase";

const createCategoriesRepository = new MySQLCategoriesRepository();

const createCategoryUseCase = new CreateCategoryUseCase(
  createCategoriesRepository
);

const createCategoryController = new CreateCategoryController(
  createCategoryUseCase
);

export {createCategoryUseCase,createCategoryController}