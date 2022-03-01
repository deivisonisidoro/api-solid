import { CreateUserUseCase } from "./CreateUserUseCase"
import { MailtrapMailProvider } from "../../../providers/implementations/MailtrapMailProvider";
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { IMailProvider } from "../../../providers/IMailProvider";
import { TestHelper } from "../../../helpers/testHelper";
import { IMemoryUserRepository } from "../../../repositories/IMemoryUserRepository";
import { UsersRepositoryInMemory } from "../../../repositories/implementations/UsersRepositoryInMemory";


describe("Create user", ()=>{
  let usersRepository: IMemoryUserRepository;
  let createUserUseCase: CreateUserUseCase;
  let mailtrapMailProvider: IMailProvider;
  
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    usersRepository = new UsersRepositoryInMemory();
    mailtrapMailProvider = new MailtrapMailProvider();
    createUserUseCase = new CreateUserUseCase(usersRepository, mailtrapMailProvider);
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  

  it("should be able to create a new user", async ()=>{
    const userData : ICreateUserRequestDTO = {
      name: "Test Name",
      email: "test@test.com.br",
      password: "123456"
    };

    const user = await createUserUseCase.execute(userData);
    
    expect(user).toHaveProperty("id");
    expect(user.name).toBe("Test Name");
  });
  it("should not be able to create an existing user", async () => {
    const userData: ICreateUserRequestDTO = {
      name: "Test Existing Name",
      email: "testexisting@test.com.br",
      password: "testexisting",
    };

    await createUserUseCase.execute(userData);

    await expect(createUserUseCase.execute(userData)).rejects.toEqual(
      new Error("User already exists!")
    );
  });
})