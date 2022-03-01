import { app } from "../../../app";
import request from "supertest";
import { TestHelper } from "../../../helpers/testHelper";

 
describe("Delete User Controller", () => {
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  it("Should be able to delete an existing user", async () => {
    const user = await request(app).post("/users").send({
      password: "123456",
      email: "testIntegrations@test.com.br",
      name: "Test Integration Exist User",
    });
  
    
    
    const response = await request(app).delete(`/users/${user.body.id}`);
  
    expect(response.status).toBe(204);
  });

  it("Should not be able to delete an existing user", async () => {
    await request(app).post("/users").send({
      password: "123456",
      email: "testIntegrationExisting@test.com.br",
      name: "Test Integration Exist User",
    });

    const response = await request(app).delete('/users/:id');

    expect(response.status).toBe(400);
  });
});