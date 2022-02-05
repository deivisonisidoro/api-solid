import { GetAllUserUseCase } from "./GetAllUserUseCase";
import {GetAllUserController} from "./GetAllUserController";
import { MySQLUsersRepository } from "../../../repositories/implementations/MySQLUsersRepository";


const userRepository = new MySQLUsersRepository();
const getAllUserUseCase = new GetAllUserUseCase(
  userRepository
);

const getAllUserController = new GetAllUserController(
  getAllUserUseCase
);

export {getAllUserUseCase, getAllUserController}