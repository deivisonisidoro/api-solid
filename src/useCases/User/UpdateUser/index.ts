import { UpdateUserUseCase } from "./UpdateUserUseCase";
import {UpdateUserController} from "./UpdateUserController";
import { MySQLUsersRepository } from "../../../repositories/implementations/MySQLUsersRepository";

const userRepository = new MySQLUsersRepository();

const updateUserUseCase = new UpdateUserUseCase(
  userRepository
);

const updateUserController = new UpdateUserController(
  updateUserUseCase
);

export {updateUserUseCase, updateUserController}