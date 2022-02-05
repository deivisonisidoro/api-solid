import { getRepository } from "typeorm";
import { User } from "../../../entities/User";
import { IDeleteRequestDTO } from "./DeleteUserDTO";

export class DeleteUserUseCase{

  async execute({id}: IDeleteRequestDTO){
    const repo = getRepository(User);
    if( !await repo.findOne(id)){
      return new Error("User does not exits!");
    }
    await repo.delete(id);

  }
}