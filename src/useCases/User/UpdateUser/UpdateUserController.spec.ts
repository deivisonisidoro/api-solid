import { app } from "../../../app";
import request from "supertest";
import { TestHelper } from "../../../helpers/testHelper";

 
describe("Update User Controller", () => {
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  it("Should be able to update an existing user", async () => {
    const user = await request(app).post("/users").send({
      password: "123456",
      email: "testIntegrations@test.com.br",
      name: "Test Integration Exist User",
    });
  
    
    
    const response = await request(app).put(`/users/${user.body.id}`).send({
      password: "123456",
      email: "testIntegration@test.com.br",
      name: "Test Integration",
    });
  
    expect(response.status).toBe(200);
  });

  it("Should not be able to update an existing user", async () => {
    await request(app).post("/users").send({
      password: "123456",
      email: "testIntegrationExisting@test.com.br",
      name: "Test Integration Exist User",
    });

    const response = await request(app).put('/users/:id').send({
      password: "123456",
      email: "testIntegrationExisting@test.com.br",
      name: "Test Integration Exist User",
    });

    expect(response.status).toBe(400);
  });
});