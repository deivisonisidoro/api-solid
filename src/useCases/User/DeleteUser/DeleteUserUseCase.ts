import { IUsersRepository } from "../../../repositories/IUserRepository";
import { IDeleteRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUseCase{
  constructor(
    private userRepository: IUsersRepository,
  ){}
  async execute(data: IDeleteRequestDTO){
    const userAlreadyExists = await this.userRepository.findById(data.id);
   
    if ( !userAlreadyExists) {
      throw new Error("User does not exits!");
    }
    await this.userRepository.delete(data.id)
  }
}