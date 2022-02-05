import { MailtrapMailProvider } from "../../../providers/implementations/MailtrapMailProvider";
import {MySQLUsersRepository} from "../../../repositories/implementations/MySQLUsersRepository";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();
const userRepository = new MySQLUsersRepository();

const createUserUseCase = new CreateUserUseCase(
  userRepository,
  mailtrapMailProvider,
);

const createUserController = new CreateUserController(
  createUserUseCase
);

export {createUserUseCase,createUserController}