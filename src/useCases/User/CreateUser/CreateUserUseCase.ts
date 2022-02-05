import { getRepository } from "typeorm";
import { User } from "../../../entities/User";
import { IMailProvider } from "../../../providers/IMailProvider";
import { IUsersRepository } from "../../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";


export class CreateUserUseCase{
  
  constructor(
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ){}
  async execute(data: ICreateUserRequestDTO): Promise<User | Error> {
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);
   
    if(userAlreadyExists){
      return new Error("User already exists.")
    }

    const user = await this.userRepository.create(data);
 
    await this.mailProvider.sendMail({
      to: {
        name: data.name,
        email: data.email,
      },
      from:{
        name: 'Equipe do Meu App',
        email: "equipe@meuapp.com"
      },
      subject: 'Seja bem vindo a plataforma',
      body: '<p>Você já pode fazer login na nossa plataforma.</p>'
    })
    await this.userRepository.save(user);
    return user;
  }
}