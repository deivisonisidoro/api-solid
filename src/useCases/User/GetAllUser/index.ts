import { GetAllUserUseCase } from "./GetAllUserUseCase";
import {GetAllUserController} from "./GetAllUserController";


const getAllUserUseCase = new GetAllUserUseCase();

const getAllUserController = new GetAllUserController(
  getAllUserUseCase
);

export {getAllUserUseCase, getAllUserController}