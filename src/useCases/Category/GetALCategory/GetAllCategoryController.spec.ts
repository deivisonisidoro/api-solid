import { app } from "../../../app";
import request from "supertest";
import { TestHelper } from "../../../helpers/testHelper";

 
describe("Get categories Controller", () => {
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  it("Should be able to get a list of categories ", async () => {
 
    const response = await request(app).get("/categories");
    
    expect(response.status).toBe(200);
   
  });
});