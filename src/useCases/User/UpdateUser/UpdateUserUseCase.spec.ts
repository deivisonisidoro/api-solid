import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { IUpdateUserRequestDTO } from "./UpdateUserDTO";
import { IMemoryUserRepository } from "../../../repositories/IMemoryUserRepository";
import { TestHelper } from "../../../helpers/testHelper";
import { UpdateUserUseCase } from "./UpdateUserUseCase";
import { UsersRepositoryInMemory } from "../../../repositories/implementations/UsersRepositoryInMemory";


describe("Update user", ()=>{
  let usersRepository: IMemoryUserRepository;
  let createUserUseCase: CreateUserUseCase;
  let updateUserUseCase: UpdateUserUseCase;

  
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    updateUserUseCase = new UpdateUserUseCase(
      usersRepository,
    );
  });
 
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  

  it("should be able to update an existing user", async ()=>{
    const userData : IUpdateUserRequestDTO = {
      id: 'test',
      name: "Test Name",
      email: "test@test.com.br",
      password: "123456"
    };

    const user = await createUserUseCase.execute(userData);
    
    user.name = "Test"
    const modifyUser = await updateUserUseCase.execute(user)

    expect(modifyUser.name).toBe("Test");
  });
  
  it("should not be able to update an existing user", async ()=>{
    const userData: IUpdateUserRequestDTO = {
      id: 'test',
      name: "Test Existing Name",
      email: "testexisting@test.com.br",
      password: "testexisting",
    };


    await expect(updateUserUseCase.execute(userData)).rejects.toEqual(
      new Error("User does not exits!")
    );
  
  });
  
})