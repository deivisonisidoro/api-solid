import { GetAllCategoryUseCase } from "./GetAllCategoryUseCase";
import {GetAllCategoryController} from "./GetAllCategoryController";


const getAllCategoryUseCase = new GetAllCategoryUseCase();

const getAllCategoryController = new GetAllCategoryController(
  getAllCategoryUseCase
);

export {getAllCategoryUseCase, getAllCategoryController}