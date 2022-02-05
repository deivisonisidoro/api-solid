import { getRepository } from "typeorm";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/IUserRepository";
import { IDeleteRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUseCase{
  constructor(
    private userRepository: IUsersRepository,
  ){}
  async execute({id}: IDeleteRequestDTO){
    const userAlreadyExists = await this.userRepository.findById(id);
    if( !userAlreadyExists){
      return new Error("User does not exits!");
    }
   
    await this.userRepository.delete(id)
  }
}