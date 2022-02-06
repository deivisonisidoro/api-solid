import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";
import {DeleteCategoryController} from "./DeleteCategoryController";
import { MySQLCategoriesRepository } from "../../../repositories/implementations/MySQLCategoriesRepository";

const deleteCategoriesRepository = new MySQLCategoriesRepository();

const deleteCategoryUseCase = new DeleteCategoryUseCase(
  deleteCategoriesRepository
);

const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryUseCase
);

export {deleteCategoryUseCase, deleteCategoryController}