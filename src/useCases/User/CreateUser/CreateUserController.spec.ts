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
  it("Should be able to create a new user", async () => {
    const response = await request(app).post("/users").send({
      password: "123456",
      email: "testIntegration@test.com.br",
      name: "Test Integration",
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create an existing user", async () => {
    await request(app).post("/users").send({
      password: "123456",
      email: "testIntegrationExisting@test.com.br",
      name: "Test Integration Exist User",
    });

    const response = await request(app).post("/users").send({
      password: "123456",
      email: "testIntegrationExisting@test.com.br",
      name: "Test Integration Exist User",
    });

    expect(response.status).toBe(400);
  });
});