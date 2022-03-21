import { app } from "../../../app";
import request from "supertest";
import { TestHelper } from "../../../helpers/testHelper";
import fs from 'mz/fs'
describe("Upload Video Controller", () => {
  beforeAll(async ()=>{
    await TestHelper.instance.setupTestDB();
  });
  afterAll(async ()=>{
    TestHelper.instance.teardownTestDB();
  })
  it("Should be able to upload a new file video", async () => {
    const categories = await request(app).post("/categories").send({
      id:'test',
      name: "Test Category",
      description: 'A test category',
      created_at: new Date(),
    });
    
    const response = await request(app).post("/videos").send({
      name: "Test Video",
      description: "A video test",
      duration: 1000,
      category_id: categories.body.id,
      file_name: "file_name",
      key: 'key',
      size: 1111,
      url: "URL"
    });
    const filePath = `${__dirname}/testFiles/test.mp4`;
    fs.exists(filePath)
    .then((exists) => {
      if (!exists) throw new Error('file does not exist');         
      request(app)
        .post(`/videos/${response.body.id}`)
        .attach('file', filePath).then((res) => {
          const { url } = res.body;
          expect(url).not.toBe(null);
          expect(typeof filePath).toBeTruthy();
        })
        .catch(err => console.log(err));
    })
  });

  it("Should not be able to upload an existing video", async () => {
    const response = await request(app).post("/videos").send({
      name: "Test Video",
      description: "A video test",
      duration: 1000,
      category_id: "id"
    });

    expect(response.status).toBe(400);
  });
});