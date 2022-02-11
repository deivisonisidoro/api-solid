import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { IRefreshTokenProvider } from "../../../providers/IRefreshTokenProvider";
import { IUsersRepository } from "../../../repositories/IUserRepository";
import { IAuthenticateUser } from "./AuthenticateDTO";

export class AuthenticateUserUseCase{
  constructor(
    private userRepository: IUsersRepository,
    private generateRefreshTokenProvider: IRefreshTokenProvider,
  ){}
  async execute({email, password}:IAuthenticateUser){
    const userAlreadyExists = await this.userRepository.findByEmail(email);
    
    if(!userAlreadyExists){
      return new Error("Email or password incorret.")
    }
    const passwordMatch = compare(password, userAlreadyExists.password);
   
    if(!passwordMatch){
      return new Error("Email or password incorret.")
    }
    await this.generateRefreshTokenProvider.delete(userAlreadyExists.id)
    const token = await this.generateRefreshTokenProvider.generateToken(userAlreadyExists.id);

    const refreshToken = await this.generateRefreshTokenProvider.create(userAlreadyExists.id)
    
    await this.generateRefreshTokenProvider.save(refreshToken);
    
    return {token, refreshToken}
  }
}