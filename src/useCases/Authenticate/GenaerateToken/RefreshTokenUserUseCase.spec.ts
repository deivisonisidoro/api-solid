import { AuthenticateUserUseCase } from "../AuthenticateUser/AuthenticateUserUseCase"

import { IAuthenticateUser } from "../AuthenticateUser/AuthenticateDTO";

import { TestHelper } from "../../../helpers/testHelper";
import { IMemoryUserRepository } from "../../../repositories/IMemoryUserRepository";
import { UsersRepositoryInMemory } from "../../../repositories/implementations/UsersRepositoryInMemory";
import { CreateUserUseCase } from "../../User/CreateUser/CreateUserUseCase";
import { IMemoryRefreshTokenProvider } from "../../../providers/IMemoryRefreshTokenProvider";
import { RefreshTokenRepositoryInMemory } from "../../../providers/implementations/RefreshTokenRepositoryInMemory";
import { RefreshTokenUserUseCase } from "./RefreshTokenUserUseCase";


describe("Authenticate user", ()=>{
  let usersRepository: IMemoryUserRepository;
  let authenticateUserUseCase: AuthenticateUserUseCase;
  let generateRefreshTokenProvider: IMemoryRefreshTokenProvider;
  let createUserUseCase: CreateUserUseCase;
  let refreshTokenUserUseCase: RefreshTokenUserUseCase;
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
    usersRepository = new UsersRepositoryInMemory( );
    generateRefreshTokenProvider = new RefreshTokenRepositoryInMemory();
    createUserUseCase = new CreateUserUseCase(usersRepository);
    authenticateUserUseCase = new AuthenticateUserUseCase(usersRepository, generateRefreshTokenProvider);
    refreshTokenUserUseCase = new RefreshTokenUserUseCase(generateRefreshTokenProvider)
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  

  it("should be able to get a token's user", async ()=>{
    const userData : IAuthenticateUser = {
      email: "test@test.com.br",
      password: "123456"
    };
    await createUserUseCase.execute({email:userData.email, name: "Test", password: userData.password });
    
    const userAuthenticated = await authenticateUserUseCase.execute(userData);
   
    expect(await refreshTokenUserUseCase.execute(userAuthenticated.refreshToken.id)).toHaveProperty("token");
  });
  it("should not be able to get a token's user", async () => {
    const userData: IAuthenticateUser = {
      email: "testexisting@test.com.br",
      password: "testexisting",
    };
    await createUserUseCase.execute({email:userData.email, name: "Test", password: userData.password });
    
    const userAuthenticated = await authenticateUserUseCase.execute(userData);
   
    await expect( refreshTokenUserUseCase.execute(userAuthenticated.token)).rejects.toEqual(
      new Error("Refresh token is invalid.")
    );

  });
})