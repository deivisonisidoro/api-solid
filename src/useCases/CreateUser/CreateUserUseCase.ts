import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase{
  
  constructor(
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ){}
  async execute(data: ICreateUserRequestDTO){
    const userAlreadyExists = await this.userRepository.findByEmail(data.email);

    if(userAlreadyExists){
      throw new Error("User already exists.")
    }
    const user = new User(data);

    await this.userRepository.save(user);
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
  }
}