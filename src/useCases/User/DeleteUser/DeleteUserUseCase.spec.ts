import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { IDeleteRequestDTO } from "./DeleteUserDTO";
import { IMemoryUserRepository } from "../../../repositories/IMemoryUserRepository";
import { TestHelper } from "../../../helpers/testHelper";
import { DeleteUserUseCase } from "./DeleteUserUseCase";
import { UsersRepositoryInMemory } from "../../../repositories/implementations/UsersRepositoryInMemory";


describe("Delete user", ()=>{
  let usersRepository: IMemoryUserRepository;
  let createUserUseCase: CreateUserUseCase;
  let deleteUserUseCase: DeleteUserUseCase;
  
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository,);
    deleteUserUseCase = new DeleteUserUseCase(
      usersRepository,
    );
  });
 
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  

  it("should be able to delete an existing user", async ()=>{
    const userData : IDeleteRequestDTO = {
      id: 'test',
      name: "Test Name",
      email: "test@test.com.br",
      password: "123456"
    };

    const user = await createUserUseCase.execute(userData);

    expect( await deleteUserUseCase.execute(user)).not.toEqual(
      new Error("User does not exits!")
    );
    expect( await deleteUserUseCase.execute(user)).toBeUndefined();
  });
  
  it("should not be able to delete an existing user", async ()=>{
    const userData : IDeleteRequestDTO = {
      id: 'tests',
      name: "Test Name",
      email: "test@test.com.br",
      password: "123456"
    };

  
    await expect(deleteUserUseCase.execute(userData)).rejects.toEqual(
      new Error("User does not exits!")
    );
  });
  
})