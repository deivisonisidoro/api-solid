import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";
import {DeleteCategoryController} from "./DeleteCategoryController";
import { MySQLCategoryRepository } from "../../../repositories/implementations/MySQLCategoryRepository";

const categoryRepository = new MySQLCategoryRepository();

const deleteCategoryUseCase = new DeleteCategoryUseCase(
  categoryRepository
);

const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryUseCase
);

export {deleteCategoryUseCase, deleteCategoryController}