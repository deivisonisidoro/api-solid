import { UpdateCategoryUseCase } from "./UpdateCategoryUseCase";
import {UpdateCategoryController} from "./UpdateCategoryController";


const updateCategoryUseCase = new UpdateCategoryUseCase();

const updateCategoryController = new UpdateCategoryController(
  updateCategoryUseCase
);

export {updateCategoryUseCase, updateCategoryController}