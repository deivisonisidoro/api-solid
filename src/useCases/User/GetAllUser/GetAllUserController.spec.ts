import { app } from "../../../app";
import request from "supertest";
import { TestHelper } from "../../../helpers/testHelper";

 
describe("Get User Controller", () => {
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  it("Should be able to get a list of users ", async () => {
 
    const response = await request(app).get("/users");
    
    expect(response.status).toBe(200);
   
  });
});