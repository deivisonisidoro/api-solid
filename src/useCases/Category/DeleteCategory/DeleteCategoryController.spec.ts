import { app } from "../../../app";
import request from "supertest";
import { TestHelper } from "../../../helpers/testHelper";

 
describe("Delete category Controller", () => {
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  it("Should be able to delete an existing category", async () => {
    const category = await request(app).post("/categories").send({
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at: new Date(),
    });
  
    
    
    const response = await request(app).delete(`/categories/${category.body.id}`);
  
    expect(response.status).toBe(204);
  });

  it("Should not be able to delete an existing category", async () => {
    await request(app).post("/categories").send({
      id:'test',
      name: "Test ",
      description: 'A test category',
      created_at: new Date(),
    });

    const response = await request(app).delete('/categories/:id');

    expect(response.status).toBe(400);
  });
});