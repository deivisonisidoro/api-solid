import {MySQLUsersRepository} from "../../../repositories/implementations/MySQLUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";


const userRepository = new MySQLUsersRepository();

const createUserUseCase = new CreateUserUseCase(
  userRepository,
 
);

const createUserController = new CreateUserController(
  createUserUseCase
);

export {createUserUseCase,createUserController}