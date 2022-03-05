import { GetAllUserUseCase } from "./GetAllUserUseCase";
import { IUsersRepository } from "../../../repositories/IUserRepository";
import { TestHelper } from "../../../helpers/testHelper";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { MailtrapMailProvider } from "../../../providers/implementations/MailtrapMailProvider";
import { IMailProvider } from "../../../providers/IMailProvider";
import { ICreateUserRequestDTO } from "../CreateUser/CreateUserDTO";
import { UsersRepositoryInMemory } from "../../../repositories/implementations/UsersRepositoryInMemory";



describe("Get all users", ()=>{
  let usersRepository: IUsersRepository;
  let getAllUserUseCase: GetAllUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  let mailtrapMailProvider: IMailProvider;
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    usersRepository = new UsersRepositoryInMemory();
    mailtrapMailProvider = new MailtrapMailProvider();
    createUserUseCase = new CreateUserUseCase(usersRepository, mailtrapMailProvider);
    getAllUserUseCase = new GetAllUserUseCase(
      usersRepository,
    );
  });
 
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  });
  
  it("should be able to get all users", async ()=>{
    const userData : ICreateUserRequestDTO = {
      name: "Test Name",
      email: "test@test.com.br",
      password: "123456"
    };
    const user = await createUserUseCase.execute(userData);

    const users = await getAllUserUseCase.execute();
  
    
    expect(users).toEqual(expect.arrayContaining([user]));
  });
  
});