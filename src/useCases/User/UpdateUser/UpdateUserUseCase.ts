import { getRepository } from "typeorm";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/IUserRepository";
import { IUpdateRequestDTO } from "./UpdateUserDTO";

export class UpdateUserUseCase{
  constructor(
    private userRepository: IUsersRepository,
  ){}
  async execute({id, name, email, password}: IUpdateRequestDTO ){
    const userAlreadyExists = await this.userRepository.findById(id);
    if(!userAlreadyExists){
      return new Error("User does not exits!");
    }
    userAlreadyExists.name = name ? name : userAlreadyExists.name;
    userAlreadyExists.email = email ? email : userAlreadyExists.email;
    userAlreadyExists.password = password ? password : userAlreadyExists.password;

    await this.userRepository.save(userAlreadyExists);
    return userAlreadyExists;
  }
}