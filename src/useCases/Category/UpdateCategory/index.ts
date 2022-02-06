import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";
import {UpdateCategoryController} from "./UpdateCategoryController";
import { MySQLCategoriesRepository } from "../../../repositories/implementations/MySQLCategoriesRepository";

const updateCategoriesRepository = new MySQLCategoriesRepository();


const updateCategoryUseCase = new UpdateCategoryUseCase(
  updateCategoriesRepository
);

const updateCategoryController = new UpdateCategoryController(
  updateCategoryUseCase
);

export {updateCategoryUseCase, updateCategoryController}