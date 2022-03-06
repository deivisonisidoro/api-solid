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
  it("Should be able to authenticate an user", async () => {
    await request(app).post("/users").send({
      password: "123456",
      email: "testIntegration@test.com.br",
      name: "Test Integration",
    });
    const response = await request(app).post("/login").send({
      password: "123456",
      email: "testIntegration@test.com.br",
    });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
    expect(response.body).toHaveProperty("refreshToken");
  });

  it("Should not be able to authenticate an user", async () => {
    const response = await request(app).post("/login").send({
      email: "testIntegrationExisting@test.com.br",
      password: "123456",
    });

    expect(response.status).toBe(400);
  });
});