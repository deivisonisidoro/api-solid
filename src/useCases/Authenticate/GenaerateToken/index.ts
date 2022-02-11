import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";
import {RefreshTokenUserController} from "./RefreshTokenUserController";
import { MySQLUsersRepository } from "../../../repositories/implementations/MySQLUsersRepository";
import { GenerateRefreshToken } from "../../../providers/implementations/GenerateRefreshToken";



const generateRefreshTokenProvider = new GenerateRefreshToken();
const refreshTokenUserUseCase = new RefreshTokenUserUseCase(
  generateRefreshTokenProvider
);

const refreshTokenUserController = new RefreshTokenUserController(
  refreshTokenUserUseCase
);

export {refreshTokenUserUseCase, refreshTokenUserController}