import { MailtrapMailProvider } from "../../../providers/implementations/MailtrapMailProvider";
import { CreateUserController } from "./CreateUserController";
import { CreateUserUseCase } from "./CreateUserUseCase";

const mailtrapMailProvider = new MailtrapMailProvider();


const createUserUseCase = new CreateUserUseCase(
  mailtrapMailProvider
);

const createUserController = new CreateUserController(
  createUserUseCase
);

export {createUserUseCase,createUserController}