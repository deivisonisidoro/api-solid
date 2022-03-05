import { app } from "../../../app";
import request from "supertest";
import { TestHelper } from "../../../helpers/testHelper";
 
describe("Create Video Controller", () => {
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  it("Should be able to create a new video", async () => {
    const categories = await request(app).post("/categories").send({
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at: Date.now(),
    });
    
    const response = await request(app).post("/videos").send({
      name: "Test Video",
      description: "A video test",
      duration: 1000,
      category_id: categories.body.id
    });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
  });

  it("Should not be able to create an existing video", async () => {
    const response = await request(app).post("/videos").send({
      name: "Test Video",
      description: "A video test",
      duration: 1000,
      category_id: "id"
    });

    expect(response.status).toBe(400);
  });
});