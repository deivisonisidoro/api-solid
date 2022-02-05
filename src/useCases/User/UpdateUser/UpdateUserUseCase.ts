import { getRepository } from "typeorm";
import { User } from "../../../entities/User";
import { IUpdateRequestDTO } from "./UpdateUserDTO";

export class UpdateUserUseCase{
  async execute({id, name, email, password}: IUpdateRequestDTO ){
    const repo = getRepository(User);
    const user = await repo.findOne(id);
    if(!user){
      return new Error("User does not exist");
    }
    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.password = password ? password : user.password;

    await repo.save(user);

    return user;
  }
}