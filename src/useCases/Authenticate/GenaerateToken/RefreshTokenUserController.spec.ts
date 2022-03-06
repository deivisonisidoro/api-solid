import { app } from "../../../app";
import request from "supertest";
import { TestHelper } from "../../../helpers/testHelper";
 
describe("Create User Controller", () => {
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  it("Should be able  to get a token's user", async () => {
    await request(app).post("/users").send({
      password: "123456",
      email: "testIntegration@test.com.br",
      name: "Test Integration",
    });
    const responLogin = await request(app).post("/login").send({
      password: "123456",
      email: "testIntegration@test.com.br",
    });
   
    const response = await request(app).post("/refresh-token").send({
      refresh_token: responLogin.body.refreshToken.id,
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("Should not be able  to get a token's user", async () => {
    await request(app).post("/users").send({
      password: "123456",
      email: "testIntegration@test.com.br",
      name: "Test Integration",
    });
    const responLogin = await request(app).post("/login").send({
      password: "123456",
      email: "testIntegration@test.com.br",
    });
   
    const response = await request(app).post("/refresh-token").send({
      refresh_token: responLogin.body.refreshToken.token,
    });

    expect(response.status).toBe(400);
  });
});