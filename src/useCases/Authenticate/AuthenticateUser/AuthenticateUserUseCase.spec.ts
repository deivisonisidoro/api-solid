import { AuthenticateUserUseCase } from "./AuthenticateUserUseCase"

import { IAuthenticateUser } from "./AuthenticateDTO";

import { TestHelper } from "../../../helpers/testHelper";
import { IMemoryUserRepository } from "../../../repositories/IMemoryUserRepository";
import { UsersRepositoryInMemory } from "../../../repositories/implementations/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../User/CreateUser/CreateUserUseCase";
import { IMemoryRefreshTokenProvider } from "../../../providers/IMemoryRefreshTokenProvider";
import { RefreshTokenRepositoryInMemory } from "../../../providers/implementations/RefreshTokenRepositoryInMemory";


describe("Authenticate user", ()=>{
  let usersRepository: IMemoryUserRepository;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let generateRefreshTokenProvider: IMemoryRefreshTokenProvider;
  let createUserUseCase: CreateUserUseCase;

  
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    usersRepository = new UsersRepositoryInMemory();
    generateRefreshTokenProvider = new RefreshTokenRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, generateRefreshTokenProvider);
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  

  it("should be able to authenticate an user", async ()=>{
    const userData : IAuthenticateUser = {
      email: "test@test.com.br",
      password: "123456"
    };
    await createUserUseCase.execute({email:userData.email, name: "Test", password: userData.password });
    
    const userAuthenticated = await authenticateUserUseCase.execute(userData);
    
    expect(userAuthenticated).toHaveProperty("token");
    expect(userAuthenticated).toHaveProperty("refreshToken");
  });
  it("should not be able to authenticate an existing user", async () => {
    const userData: IAuthenticateUser = {
      email: "testexisting@test.com.br",
      password: "testexisting",
    };

  
    await expect(authenticateUserUseCase.execute(userData)).rejects.toEqual(
      new Error("Email or password incorret.")
    );
  });
})