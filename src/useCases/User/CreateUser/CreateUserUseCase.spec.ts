import { CreateUserUseCase } from "./CreateUserUseCase"
import { ICreateUserRequestDTO } from "./CreateUserDTO";
import { TestHelper } from "../../../helpers/testHelper";
import { IMemoryUserRepository } from "../../../repositories/IMemoryUserRepository";
import { UsersRepositoryInMemory } from "../../../repositories/implementations/UsersRepositoryInMemory";


describe("Create user", ()=>{
  let usersRepository: IMemoryUserRepository;
  let createUserUseCase: CreateUserUseCase;
  
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
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