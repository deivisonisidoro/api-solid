import { DeleteUserUseCase } from "./DeleteUserUseCase";
import {DeleteUserController} from "./DeleteUserController";
import { MySQLUsersRepository } from "../../../repositories/implementations/MySQLUsersRepository";

const userRepository = new MySQLUsersRepository();
const deleteUserUseCase = new DeleteUserUseCase(
  userRepository,
);

const deleteUserController = new DeleteUserController(
  deleteUserUseCase
);

export {deleteUserUseCase, deleteUserController}