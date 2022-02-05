import { DeleteCategoryUseCase } from "./DeleteCategoryUseCase";
import {DeleteCategoryController} from "./DeleteCategoryController";


const deleteCategoryUseCase = new DeleteCategoryUseCase();

const deleteCategoryController = new DeleteCategoryController(
  deleteCategoryUseCase
);

export {deleteCategoryUseCase, deleteCategoryController}