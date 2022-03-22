import { getRepository } from "typeorm";
import { User } from "../../../entities/User";
import { IUsersRepository } from "../../../repositories/IUserRepository";

export class GetAllUserUseCase{
  constructor(
    private userRepository: IUsersRepository,
  ){}
  async execute(page: number){
    const users = await this.userRepository.findAll(page);
    return users
  }
}