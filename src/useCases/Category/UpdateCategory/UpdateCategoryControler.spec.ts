import { app } from "../../../app";
import request from "supertest";
import { TestHelper } from "../../../helpers/testHelper";

 
describe("Update categories Controller", () => {
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  it("Should be able to update an existing category", async () => {
    const category = await request(app).post("/categories").send({
      id:'test',
      name: "Test",
      description: 'A test category',
      created_at: new Date(),
    });
  
    
    
    const response = await request(app).put(`/categories/${category.body.id}`).send({
      id:'test',
      name: "Passed the test",
      description: 'A test category',
      created_at: new Date(),
    });
  
    expect(response.status).toBe(200);
  });

  it("Should not be able to update an existing category", async () => {
    await request(app).post("/categories").send({
      id:'test',
      name: "Test",
      description: 'A test category',
      created_at: new Date(),
    });

    const response = await request(app).put('/categories/:id').send({
      id:'test',
      name: "Test",
      description: 'A test category',
      created_at: new Date(),
    });

    expect(response.status).toBe(400);
  });
});