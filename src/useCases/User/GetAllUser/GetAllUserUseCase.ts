import { getRepository } from "typeorm";
import { User } from "../../../entities/User";

export class GetAllUserUseCase{
  async execute(){
    const repo = getRepository(User);
    const user = await repo.find();
    return user;
  }
}