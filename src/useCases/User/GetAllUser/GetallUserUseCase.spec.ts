import { GetAllUserUseCase } from "./GetAllUserUseCase";
import { IUsersRepository } from "../../../repositories/IUserRepository";
import { TestHelper } from "../../../helpers/testHelper";
import { CreateUserUseCase } from "../CreateUser/CreateUserUseCase";
import { ICreateUserRequestDTO } from "../CreateUser/CreateUserDTO";
import { UsersRepositoryInMemory } from "../../../repositories/implementations/UsersRepositoryInMemory";



describe("Get all users", ()=>{
  let usersRepository: IUsersRepository;
  let getAllUserUseCase: GetAllUserUseCase;
  let createUserUseCase: CreateUserUseCase;
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    usersRepository = new UsersRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
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