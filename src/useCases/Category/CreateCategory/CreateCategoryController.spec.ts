import { app } from "../../../app";
import request from "supertest";
import { TestHelper } from "../../../helpers/testHelper";
 
describe("Create Category Controller", () => {
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  it("Should be able to create a new category", async () => {
    const response = await request(app).post("/categories").send({
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at:  new Date(),
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create an existing Category", async () => {
    await request(app).post("/categories").send({
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at:  new Date(),
    });

    const response = await request(app).post("/categories").send({
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at:  new Date(),
    });

    expect(response.status).toBe(400);
  });
});