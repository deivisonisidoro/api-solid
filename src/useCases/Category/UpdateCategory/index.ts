import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";
import {UpdateCategoryController} from "./UpdateCategoryController";
import { MySQLCategoryRepository } from "../../../repositories/implementations/MySQLCategoryRepository";

const categoryRepository = new MySQLCategoryRepository();


const updateCategoryUseCase = new UpdateCategoryUseCase(
  categoryRepository
);

const updateCategoryController = new UpdateCategoryController(
  updateCategoryUseCase
);

export {updateCategoryUseCase, updateCategoryController}