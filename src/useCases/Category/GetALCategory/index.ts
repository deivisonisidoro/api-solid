import { GetAllCategoryUseCase } from "./GetAllCategoryUseCase";
import {GetAllCategoryController} from "./GetAllCategoryController";
import { MySQLCategoriesRepository } from "../../../repositories/implementations/MySQLCategoriesRepository";

const getAllCategoriesRepository = new MySQLCategoriesRepository();


const getAllCategoryUseCase = new GetAllCategoryUseCase(
  getAllCategoriesRepository
);

const getAllCategoryController = new GetAllCategoryController(
  getAllCategoryUseCase
);

export {getAllCategoryUseCase, getAllCategoryController}