import { hash } from "bcryptjs";
import { User } from "../../../entities/User";
import { IMailProvider } from "../../../providers/IMailProvider";
import { IUsersRepository } from "../../../repositories/IUserRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";


export class CreateUserUseCase{
  
  constructor(
    private userRepository: IUsersRepository,
    private mailProvider: IMailProvider,
  ){}
  async execute({email, name, password}: ICreateUserRequestDTO): Promise<User | Error> {
    const userAlreadyExists = await this.userRepository.findByEmail(email);
   

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const passwordHash = await hash(password, 8)
    const user = await this.userRepository.create({email, name, password: passwordHash,});
 
    // await this.mailProvider.sendMail({
    //   to: {
    //     name: name,
    //     email: email,
    //   },
    //   from:{
    //     name: 'Equipe do Meu App',
    //     email: "equipe@meuapp.com"
    //   },
    //   subject: 'Seja bem vindo a plataforma',
    //   body: '<p>Você já pode fazer login na nossa plataforma.</p>'
    // })
    await this.userRepository.save(user);
    return user;
  }
}