import { GetAllCategoryUseCase } from "./GetAllCategoryUseCase";
import {GetAllCategoryController} from "./GetAllCategoryController";
import { MySQLCategoryRepository } from "../../../repositories/implementations/MySQLCategoryRepository";

const categoryRepository = new MySQLCategoryRepository();

const getAllCategoryUseCase = new GetAllCategoryUseCase(
  categoryRepository
);

const getAllCategoryController = new GetAllCategoryController(
  getAllCategoryUseCase
);

export {getAllCategoryUseCase, getAllCategoryController}