import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase";
import {AuthenticateUserController} from "./AuthenticateUserController";
import { MySQLUsersRepository } from "../../../repositories/implementations/MySQLUsersRepository";
import { GenerateRefreshToken } from "../../../providers/implementations/GenerateRefreshToken";


const userRepository = new MySQLUsersRepository();
const generateRefreshTokenProvider = new GenerateRefreshToken();
const authenticateUserUseCase = new AuthenticateUserUseCase(
  userRepository,
  generateRefreshTokenProvider
);

const authenticateUserController = new AuthenticateUserController(
  authenticateUserUseCase
);

export {authenticateUserUseCase, authenticateUserController}