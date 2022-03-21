import { hash } from "bcryptjs";
import Queue from "../../../lib/Queue";
import { IUsersRepository } from "../../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase{
  
  constructor(
    private userRepository: IUsersRepository,
  ){}
  async execute({email, name, password}: ICreateUserRequestDTO) {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
   

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8)
    const user = await this.userRepository.create({email, name, password: passwordHash,});
   
    // Queue.add('RegistrationMail', {user});

    await this.userRepository.save(user);
    return user;
  }
}